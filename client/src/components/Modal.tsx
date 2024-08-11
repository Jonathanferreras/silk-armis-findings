import { MouseEventHandler, ReactNode } from "react";

interface IModalProps {
  children: ReactNode;
  open: boolean;
  onModalToggle: React.MouseEventHandler<HTMLDivElement>;
}

export const Modal = ({ children, open, onModalToggle }: IModalProps) => {
  const styles = {
    background: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      width: "100%",
      height: "100vh",
      position: "absolute" as const,
      zIndex: "99",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    container: { backgroundColor: "white", width: "90%" },
    header: {
      display: "flex",
      justifyContent: "end",
    },
    closeModalButton: {
      borderRadius: "5px",
      padding: "5px 10px",
      margin: "10px",
      backgroundColor: "red",
      color: "white",
      cursor: "pointer",
    },
    body: {
      margin: "25px",
    },
  };
  if (open) {
    return (
      <div style={styles.background}>
        <div style={styles.container}>
          <div style={styles.header}>
            <div style={styles.closeModalButton} onClick={onModalToggle}>
              Close
            </div>
          </div>
          <div style={styles.body}>{children}</div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};
