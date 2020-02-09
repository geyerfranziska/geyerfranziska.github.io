document.addEventListener("DOMContentLoaded", function(event) {
MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
document.querySelector('#berechnen').addEventListener('click', nullstellen);
});
// MathJax.Hub.Queue(["Typeset",MathJax.Hub,document.getElementById("result")]);

function nullstellen() {
    let p = parseFloat(document.getElementById("pVal").value),
	q = parseFloat(document.getElementById("qVal").value);
    console.log(p,q);
    let xA = [];
    let yA = [];
    for (let x=-20; x<=20; x+=0.1) {
	xA.push(x);
	yA.push(x * x + p * x + q);
    }
    let trace1 = {
	x: xA,
	y: yA,
	mode: 'lines'
    }
    let x0 = xA.findIndex(x => Math.abs(x - -5) < 0.00001);
    let x1 = xA.findIndex(x => Math.abs(x - 5) < 0.00001);
    let minY = Math.min(...yA.slice(x0, x1));
    let maxY = Math.max(...yA.slice(x0, x1));
    let result = loesen(p,q);
    let antwort = `<span>\\[x^2 + ${p}x + ${q} = 0\\]`;
    if (result.length === 0)
        antwort += "\\(\\text{keine Nullstellen}\\)";
    if (result.length === 1)
        antwort += `\\[x_{1}=${result[0]}\\]`;
    if (result.length === 2)
        antwort += `\\[x_{1}=${result[0]}\\]\\[x_{2}=${result[1]}\\]`;
    antwort += "</span>"
    document.getElementById("result").innerHTML = antwort;
    //    MathJax.typeset();
    let nyA = [];
    for (let i =0; i< result.length; i++)
	nyA.push(0);
    let trace2 = {
	x: result,
	y: nyA,
	mode: 'markers'
    }
    let layout = {
	showlegend: false,
        xaxis: {range: [-5, 5]},
        yaxis: {range: [Math.floor(minY / 5) * 5, Math.floor(maxY / 5) * 5]},
        autosize: false,
	width: 500,
	height: 500
    };
    Plotly.newPlot('graph', [trace1,trace2],layout);
    
    console.log(xA, x0,x1,minY, maxY);
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,document.getElementById("result")]);
    //     MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}
