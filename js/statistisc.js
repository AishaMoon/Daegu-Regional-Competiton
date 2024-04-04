const init = () => {
    view.init();
    events();
}

const animation = [];


const chart = {
    init(canvas, ctx, data, type) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.data = data;
        this.type = type;
        this.isAnimation = true;

        const axises = Array.from({ length: 11 }).map((_, i, arr) => String(i * 50));
        this.type === 'y' && axises.reverse();
        const datas = Object.keys(this.data);

        this.xAxisTexts = this.type === 'y' ? datas : axises;
        this.yAxisTexts = this.type === 'y' ? axises : datas;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.font = '10px Arial';
        this.ctx.textBaseline = 'middle';

        this.yAxis();
        this.xAxis();
        this.box();
        this.graph();
        this.table();
    },
    yAxis() {
        this.yAxisX = Math.max(...this.yAxisTexts.map((t) => this.ctx.measureText(t).width)) + 10;
        const num = this.type === 'x' ? 100 : 0;
        const unit = (this.canvas.height - 10 - 10 - 15 - num - num) / (this.yAxisTexts.length - 1);

        this.yAxisArr = this.yAxisTexts.map((name, i) => {
            const x = this.yAxisX + 5;
            const y = 10 + num + (i * unit);

            this.ctx.textAlign = 'end';
            this.ctx.fillText(name, x - 5, y);
            return { name, x, y };
        })
    },

    xAxis() {
        const num = this.type === 'y' ? 100 : 0;
        const unit = (this.boxW - num - num) / (this.xAxisTexts.length - 1);

        this.xAxisArr = this.xAxisTexts.map((name, i) => {
            const x = this.boxX = num + (i * unit);
            const y = this.boxY + this.boxH;

            this.ctx.textAlign = 'center';
            this.ctx.fillText(name, x, y + 15);
            return { name, x, y };
        })
    },

    box() {
        this.boxX = this.yAxisX + 5;
        this.boxY = 10;
        this.boxW = this.canvas.width - this.boxX - 10;
        this.boxH = this.canvas.height - 10 - 10 - 15;

        this.ctx.beginPath();
        this.ctx.lineWidth = 0.1;
        this.ctx.strokeRect(this.boxX, this.boxY, this.boxW, this.boxH);
    },

    graph() {
        const arr = this.type === 'y' ? this.xAxisArr : this.yAxisArr;
        Object.values(this.data).map((d, i) => {
            let { x, y } = arr[i];
            const max = d / 500 * (this.type === 'y' ? this.boxH : this.boxW);
            const graphSize = 70;

            x -= this.type === 'y' ? graphSize / 2 : 0;
            y -= (this.type === 'x' ? graphSize / 2 : 0);

            this.ctx.fill();
            this.animation(x, y, max, graphSize,);
        })
    },

    table() {
        $('.chart-table').html(`
        <table>
            <thead>
                <tr>
                    <th>방문자 수/시간대</th>
                    ${Object.keys(this.data).map(d => `<th>${d}</th>`).join('')}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>방문자 수</td>
                    ${Object.values(this.data).map(d => `<td>${d}</td>`).join('')}
                </tr>
            </tbody>
        </table>
        `);
        $('.chart-table table').animate({
            top: 0,
            opacity: 1,
        }, 500)
    },

    animation(x, y, max, graphSize, num = 0) {
        if (Math.abs(num) >= max || !this.isAnimation) return;

        const w = this.type === 'y' ? graphSize : num;
        const h = this.type === 'y' ? Math.abs(num) * -1 : graphSize;

        this.ctx.fillRect(x, y, w, h);
        num += 5;
        animation.push(requestAnimationFrame(() => this.animation(x, y, max, graphSize, num)));
    },
}

const view = {
    async init() {
        this.data = (await $.getJSON('./resource/visitors.json')).data;
        this.axis = 'y';
        this.tab();
        this.chart();
    },
    tab() {
        $('.tabs').html(this.data.map(({ name }, i) => `<div class="tab ${!i ? 'active' : ''}">${name}</div>`).join(''));
    },
    chart() {
        this.canvas = $('#chart')[0];
        this.ctx = this.canvas.getContext('2d');

        const data = this.data.find(({ name }) => name === $('.tab.active').text()).visitors.find(({ day }) => day === $('.day.active').text()).visitor;

        animation.map(a => cancelAnimationFrame(a));
        animation.length = 0;

        chart.init(this.canvas, this.ctx, data, this.axis);
    },
}

const events = () => {
    $(document)
        .on('click', '.view', event.view)
        .on('click', '.day', event.day)
        .on('click', '.tab', event.tab)
}

const event = {
    tab(e) {
        $('.tab').removeClass('active').eq($(e.target).index()).addClass('active');
        view.chart();
    },
    day(e) {
        $('.day').removeClass('active').eq($(e.target).index()).addClass('active');
        view.chart();
    },
    view(e) {
        view.axis = $(e.target).data('axis');
        $('.view').removeClass('active').eq($(e.target).index()).addClass('active');
        view.chart();
    }
}

$(() => init())



































