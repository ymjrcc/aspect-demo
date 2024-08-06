import {
    allocate,
    entryPoint,
    execute,
    IPreContractCallJP,
    PreContractCallInput,
    sys,
    uint8ArrayToHex,
    UintData,
} from "@artela/aspect-libs";
import {Protobuf} from "as-proto/assembly";

class ConfigurableTimeRestrictedTradingAspect implements IPreContractCallJP {
    preContractCall(input: PreContractCallInput): void {
        // Get the current block timestamp
        const blockTimeBytes = sys.hostApi.runtimeContext.get("block.header.timestamp");
        const blockTime = Protobuf.decode<UintData>(blockTimeBytes, UintData.decode).data;

        // Convert blockTime to Date object (assuming blockTime is in seconds)
        const date = new Date(blockTime * 1000);

        // Get configured trading days (1-7, where 1 is Monday and 7 is Sunday)
        const allowedDays = sys.aspect.property.get<string>("allowedDays");
        const allowedDaysArray = allowedDays.split(',').map<i32>((day) => parseInt(day.trim()) as i32);

        // Get configured trading hours
        const startHour = sys.aspect.property.get<i32>("startHour");
        const endHour = sys.aspect.property.get<i32>("endHour");

        // Check if it's an allowed day
        const currentDay = date.getUTCDay() + 1; // getUTCDay() returns 0-6, we convert to 1-7
        if (!allowedDaysArray.includes(currentDay)) {
            sys.revert("Trading is not allowed on this day");
        }

        // Get hour in UTC
        const currentHour = date.getUTCHours();

        // Check if it's within allowed hours
        if (currentHour < startHour || currentHour >= endHour) {
            sys.revert(`Trading is only allowed between ${startHour}:00 and ${endHour}:00 UTC`);
        }

        // If we've reached here, the trading is allowed
        // You can add additional logic here if needed
    }

    isOwner(sender: Uint8Array): boolean {
        // Implement owner check logic if needed
        return false;
    }
}

// Register aspect Instance
const aspect = new ConfigurableTimeRestrictedTradingAspect()
entryPoint.setAspect(aspect)

// Export required functions
export { execute, allocate }