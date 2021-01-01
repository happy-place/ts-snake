import './style/index.less';
// import Food from './module/Food';
// import ScorePanel from './module/ScorePanel';
// import Snake from './module/Snake';
import GameControl from './module/GameControl';


// function TestFood(){
//     const food = new Food()
//     console.log(food.X,food.Y)
//     food.change()
//     console.log(food.X,food.Y)
// }
// TestFood()
//
// function TestScore() {
//     const scorePanel = new ScorePanel();
//     for (let i = 0; i < 200; i++) {
//         scorePanel.addScore();
//     }
// }
// TestScore()

function TestControl(){
    const ctrl = new GameControl();
    // 每秒打印一次蛇的方向
    setInterval(
        ()=>{console.log(ctrl.direction)},
        1000
    )
}
TestControl()
