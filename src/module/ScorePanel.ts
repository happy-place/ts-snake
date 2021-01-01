class ScorePanel{
    // 最高等级
    maxLevel:number
    // 间隔多少分升级一次
    upScore:number

    // 分数和等级数值
    score = 0;
    level = 1;

    // 分数和等级div,构造器中初始化
    scoreEle:HTMLElement;
    levelEle:HTMLElement;

    // 默认最高等级为10
    constructor(maxLevel:number=10,upScore:number=2) {
        this.maxLevel = maxLevel;
        this.upScore=upScore;
        this.scoreEle = document.getElementById("score")!;
        this.levelEle = document.getElementById("level")!;
    }

    addScore(){
        // 分数递增，然后设置回去
        this.scoreEle.innerHTML = ++this.score+'';
        // 升级策略：每10分升级一次
        if(this.score % this.upScore === 0 ){
            this.levelUp();
        }
    }

    levelUp(){
        // 等级提升，需要设置等级上限
        if(this.level<this.maxLevel){
            this.levelEle.innerHTML = ++this.level+'';
        }
    }
}

function TestScore() {
    const scorePanel = new ScorePanel();
    for (let i = 0; i < 200; i++) {
        scorePanel.addScore();
    }
}

export default ScorePanel;