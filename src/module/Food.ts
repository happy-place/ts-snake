// 食物 使用的是绝对坐标系
class Food {
    // 游动范围
    range:number
    // 蛇元素 对应food div
    element:HTMLElement;
    constructor() {
        //末尾加 ! 表示确定不为空，一定能找到
        this.element = document.getElementById("food")!;
        // 介于 0 ~ stage.weight - food.weight 之间
        this.range = (document.getElementById("stage")!.offsetWidth -
            document.getElementById("food")!.offsetWidth)/10;
    }

    // 获取食物的X轴坐标
    get X(){
        return this.element.offsetLeft;
    }
    // 获取食物的Y轴坐标
    get Y(){
        return this.element.offsetTop;
    }

    // 修改食物位置
    change(){
        // 生成随机位置
        // X 最左0 最有 屏幕宽300 - 蛇宽10 = 290,同理Y也是
        // 蛇一格移动为10，食物大小必须为10，且X取值必须是  0~290 之间整数，且是10倍数
        let top = Math.round(Math.random() * this.range) * 10
        let left = Math.round(Math.random() * this.range) * 10

        this.element.style.left = left+'px';
        this.element.style.top = top+'px';
    }

}

function TestFood(){
    const food = new Food()
    console.log(food.X,food.Y)
    food.change()
    console.log(food.X,food.Y)
}

// 导包，默认到Food类
export default Food;