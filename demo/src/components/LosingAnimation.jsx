import Confetti from 'react-dom-confetti';

const config = {
  angle: 90,
  spread: "70",
  startVelocity: "90",
  elementCount: "200",
  dragFriction: 0.12,
  duration: "8110",
  stagger: "13",
  width: "19px",
  height: "19px",
  perspective: "503px",
  colors: ["#FF0000", "#FF0000", "#FF0000"]
};

function LosingAnimation() {
  return <Confetti active={ true } config={ config }/>;
}

export default LosingAnimation;
