class Snake{
    // 游动范围
    range:number
    // 上下边界
    top:number
    // 左右边界
    left:number
    // div 宽度
    width:number
    // 蛇div
    element:HTMLElement;
    // 表示蛇元素 (蛇头)
    head:HTMLElement;
    // 蛇身体，即snake-div中所有子div
    bodies:HTMLCollection;

    constructor() {
        this.range = (document.getElementById("stage")!.offsetWidth -
            document.getElementById("food")!.offsetWidth)/10;

        this.left = Math.round(Math.random() * this.range) * 10;
        this.top  = Math.round(Math.random() * this.range) * 10;

        // 蛇div
        this.element = document.getElementById("snake")!;
        // querySelector 返回的是Element 对象，通过as断言 为HtmlElement对象
        this.head = document.querySelector("#snake > div") as HTMLElement;
        this.width = this.head.offsetWidth;
        // 先找到 snake-div，在找内部全部子div
        this.bodies = document.getElementById("snake")!.getElementsByTagName("div");
    }

    // 蛇头 X坐标
    get X(){
        return this.head.offsetLeft;
    }

    set X(value:number){
        // 值没修改就不重新赋值
        if(this.X === value){
            return
        }
        if(value<0 || value> 290){
            // 蛇撞墙了
            throw new Error("蛇撞墙!Game Over")
        }

        // 修改X控制蛇左右移动，禁止蛇水平方向掉头（如果直接return 则蛇停止了，正确做法是继续按之前方向行走）
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value){
            // 当存在第二节，且即将设置的蛇头水平坐标与第二节一致，则禁止赋值，即禁止掉头
            if(value > this.X){
                // 蛇即将掉头，且向右走
                value = this.X - 10;
            }else{
                // 蛇即将掉头，且向左走
                value = this.X + 10;
            }
        }
        this.moveBody();
        this.head.style.left = value + 'px';
        this.checkHeadBody();
    }

    // 蛇头 Y坐标
    get Y(){
        return this.head.offsetTop;
    }

    set Y(value:number){
        if(this.Y == value){
            return
        }
        if(value<0 || value>290){
            // 蛇撞墙了，抛出异常，则运动停止
            throw new Error("🐍撞墙")
        }
        // 修改Y控制蛇上下移动，禁止蛇水平方向掉头（如果直接return 则蛇停止了，正确做法是继续按之前方向行走）
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value){
            // 当存在第二节，且即将设置的蛇头垂直坐标与第二节一致，则禁止赋值，即禁止掉头
            if(value > this.Y){
                // 蛇即将掉头，且向右走
                value = this.Y - 10;
            }else{
                // 蛇即将掉头，且向左走
                value = this.Y + 10;
            }
        }
        this.moveBody();
        this.head.style.top = value + 'px';
        this.checkHeadBody();
    }

    // 蛇增加身体
    addBody(){
        // 在末尾添加div
        this.element.insertAdjacentHTML("beforeend","<div></div>")
    }

    // 添加身体div移动
    moveBody(){
        /**从后往前改，将后面身体设置为前面身体
         *  第4节 = 第3节
         *  第3节 = 第2节
         *  第2节 = 第1节
         *
         * */
        for(let i=this.bodies.length-1;i>0;i--){
            let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i-1] as HTMLElement).offsetTop;
            (this.bodies[i] as HTMLElement).style.left = X +'px';
            (this.bodies[i] as HTMLElement).style.top = Y +'px';
        }
    }

    checkHeadBody(){
        // 获取所有身体，检查是身体是否和蛇头碰撞
        for(let i=1;i<this.bodies.length;i++){
            let bd = this.bodies[i] as HTMLElement;
            if(this.X === bd.offsetLeft && this.Y === bd.offsetTop){
                // 蛇撞到身体了
                throw new Error("🐍撞到自己身体")
            }
        }
    }

}

export default Snake;