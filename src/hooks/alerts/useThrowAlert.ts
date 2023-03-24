import { setAlert } from "../../redux/alertSlice";
import { useDispatch } from "../../redux/reduxHooks";

export default function useThrowAlert() {
  const dispatch = useDispatch();

  function throwAlert(message: string, options?: Partial<AlertNotification>): void {
    const newAlert: AlertNotification = {
      message,
      type: "error",
      ...options
    };
    dispatch(setAlert(newAlert))
  };

  function catchUnknownError(err: unknown, altMessage?: string): void {
    if(err instanceof Error) {
      throwAlert(err.message)
    } else {
      throwAlert(altMessage || "Something went wrong")
    };
  };

  return {
    throwAlert,
    catchUnknownError
  };
};