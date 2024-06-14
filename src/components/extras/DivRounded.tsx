
// En el orden por el que se utilizan

interface DivRoundedProps {
  divClassName?: string,
  textClassName?: string,
  text: string,
}

export const DivRounded = ({
    divClassName,
    textClassName,
    text
  }: DivRoundedProps) => {
    return (
        <div className={" bg-white  mx-auto rounded-[50px] border-2 border-blue-300 ".concat(
            "", 
            divClassName || ""
            )}>
          <p className={"text-base font-base text-center text-blueEmmagini "
          .concat(
              " ",
              textClassName || ""
            )}>{text}</p>
        </div>
  );
};

export default DivRounded;

