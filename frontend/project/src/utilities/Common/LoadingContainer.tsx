import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";
import type { RootState } from "../../Redux/store/store";
import { useEffect } from "react";

const useStyles = createUseStyles({
  LoadingContainer: {
    height: "100dvh",
    backgroundColor: "#101b2cb0",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "0px",
    left: "0px",
    width: "100%",
    zIndex: "100",
  },
  LoadingSection: {
    display: "grid",
    gridTemplateColumns: "repeat(1fr)",
    gap: "20px",
    justifyItems: "center",
  },
  spanContainer: {
    position: "relative",
    width: "80px",
    height: "80px",
  },
  span: {
    position: "absolute",
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: "white",
    top: "35px",
    left: "35px",
    animation: "$fade 1.2s linear infinite",
  },

  "@keyframes fade": {
    "0%": {
      opacity: 0.2,
    },

    "50%": {
      opacity: 1,
    },

    "100%": {
      opacity: 0.2,
    },
  },
});
export default function LoadingContainer() {
  const classes = useStyles();
  const spanArr = Array.from({ length: 12 }, (_, i) => i);
  const { isLoading } = useSelector((state: RootState) => state.loadingSlice);
  /* function */

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100dvh";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    };
  }, [isLoading]);
  /*  */
  return (
    <div className={classes.LoadingContainer}>
      <div className={classes.LoadingSection}>
        <h1>Loading</h1>
        <div className={classes.spanContainer}>
          {spanArr.map((_, ind) => (
            <div
              key={ind}
              className={classes.span}
              style={{
                transform: `rotate(${ind * 30}deg) translateY(-30px)`,
                animationDelay: `${ind * 0.1}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
