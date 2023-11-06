/**
 * Conditional types
 * Conditional types are typically used in TypeScript to define types that depend on other types, often in the context of generics and utility types.
 */

type a = null;
type b = undefined;

type A = a extends null ? true : false;
type B = a extends null ? true : b extends undefined ? undefined : any;

//---------------------------------------------------

type Vehicles = {
  bike: string;
  car: string;
  train: string;
  plane: string;
};

type AvailableVehicle<T> = T extends keyof Vehicles ? true : false;

type IsBikeAvailable = AvailableVehicle<'bike'>;
type IsCarAvailable = AvailableVehicle<'car'>;
type IsTrainAvailable = AvailableVehicle<'train'>;
type IsPlaneAvailable = AvailableVehicle<'plane'>;
type IsBoatAvailable = AvailableVehicle<'boat'>;
