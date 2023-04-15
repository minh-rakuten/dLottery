import Confetti from 'react-dom-confetti';

const config = {
    angle: 90,
    spread: "31",
    startVelocity: 40,
    elementCount: "200",
    dragFriction: "0.03",
    duration: "5940",
    stagger: 3,
    width: "15px",
    height: "44px",
    perspective: "647px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
  };

function WinningAnimation () {
    return <Confetti active={ true } config={ config }/>
}

export default WinningAnimation;