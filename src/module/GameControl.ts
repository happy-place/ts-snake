// 游戏控制类中引入其他几个类
import Food from './Food';
import ScorePanel from './ScorePanel';
import Snake from './Snake';

class GameControl {
    initSpeed: number; // 初始蛇移动速度，默认1/300.没增加一级，速度加快一次1/270
    snake: Snake; // 蛇
    food: Food; // 食物
    scorePanel: ScorePanel; // 记分牌
    direction: string = 'Right'; // 蛇移动方向(需要赋值才能使用)

    // 记录蛇是否是活的，撞墙即死
    isLive: boolean = true;

    constructor(initSpeed: number = 300) {
        this.initSpeed = initSpeed;
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel();
        this.init();
        console.log("ctrl init")
    }

    // 初始化
    init() {
        // 注册监听器，监听按键按下事件，交给keydownHandler处理
        /**js 中事件绑定谁，回调函数中的this就是谁，
         * 此处给document绑定keydown监听器，回调为keydownHandler，因此keydownHandler 中的
         * this默认为document,要获取正确GameControl 的this,只能手动绑定进去.bind(this)
         *
         * */
        document.addEventListener('keydown', this.keydownHandler.bind(this))
        this.run();
    }

    /*
        chrome:
            ArrowUp
            ArrowRight
            ArrowLeft
            ArrowDown
    *   IE:
          Up
          Right
          Left
          Down
    * **/
    keydownHandler(event: KeyboardEvent) {
        // console.log(event.key);
        // 方向键按下，修改蛇移动方向（不能直接赋值，需要检查是否是正确按键）
        this.direction = event.key;
    }

    // 控制蛇移动方法
    run() {
        /**
         * 根据this.direction 控制移动方向
         * 向上 top 减少
         * 向下 top 增加
         * 向左 left 减少
         * 向右 left 增加
         */
        let X = this.snake.X;
        let Y = this.snake.Y;
        let width = this.snake.width
        switch (this.direction) {
            case "ArrowUp":
            case "Up":
                Y -= width;
                break;
            case "ArrowDown":
            case "Down":
                Y += width;
                break;
            case "ArrowLeft":
            case "Left":
                X -= width;
                break;
            case "ArrowRight":
            case "Right":
                X += width;
                break;
        }

        this.checkEat(X,Y)

        // 设置回去
        try {
            this.snake.X = X;
            this.snake.Y = Y;
        } catch (e) {
            // 赋值异常，说明蛇撞墙 或 撞到自己了
            alert(e.message)
            this.isLive = false
        }

        /*
        * 递归实现连续调用
        * this.initSpeed-(this.scorePanel.level-1)*30 随着等级增加，移动越来越快
        * */
        // 仅在init()中调用一次，然后就通过定时调度，周期性执行，让蛇动起来
        this.isLive && setTimeout(this.run.bind(this), this.initSpeed - (this.scorePanel.level - 1) * 30);
        // 蛇存活时才运行递归
    }

    // 检查蛇是否吃到食物，涉及蛇和食物
    checkEat(X:number,Y:number){
        if(X=== this.food.X && Y === this.food.Y){
            // console.log("吃到食物")
            this.food.change() // 换地
            this.scorePanel.addScore() // 加分
            this.snake.addBody() // 增加身体
        }
    }

}

export default GameControl;