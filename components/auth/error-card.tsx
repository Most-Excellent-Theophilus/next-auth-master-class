import { BsExclamationCircle } from "react-icons/bs";
import { CardWrapper } from "./card-wrapper";

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something Went Wrong!"
      backButtonHref="/login"
      backButtonLabel="Back to log In"
    >
      <div className="w-full flex justify-center items-center">
        <BsExclamationCircle className="text-destructive" />
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;
