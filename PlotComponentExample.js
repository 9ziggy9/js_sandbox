import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Plot from 'react-plotly.js';

// UTILITY FUNCTION FOR FOLDING MULTIPLE ARRAYS
function foldData(matrix) {
  // we need to reduce over VERTICAL indices, in order to do this conveniently,
  // we have to take a matrix transpose.
  const result = new Array(matrix[0].length).fill(0);
  const matrixTranspose = matrix[0].map((_,x) => matrix.map(m_y => m_y = m_y[x]));
  // we then map elements of results array into sum over columns of matrix.
  return result.map((a,u) => matrixTranspose[u].reduce((a, v) => a + v));
} //

// Parameters to pass to Plot component.
const dataSet = (d) => [{x:d[0], y:d[1],
			  type:'scatter', mode:'lines',
			  marker: {color: 'orangered'}}];
const customLayout = {
  showlegend: false, margin: {b: 0, r: 30, l: 30, t: 0}, autosize: true,
  modebar: {
    remove: ["autoScale2d", "autoscale", "editInChartStudio",
	      "editinchartstudio", "hoverCompareCartesian", "hovercompare",
	      "lasso", "lasso2d", "orbitRotation", "orbitrotation", "pan",
	      "pan2d", "pan3d", "reset", "resetCameraDefault3d",
	      "resetCameraLastSave3d", "resetGeo", "resetSankeyGroup",
	      "resetScale2d", "resetViewMapbox", "resetViews",
	      "resetcameradefault", "resetcameralastsave", "resetsankeygroup",
	      "resetscale", "resetview", "resetviews", "select", "select2d",
	      "sendDataToCloud", "senddatatocloud", "tableRotation",
	      "tablerotation", "toImage", "toggleHover", "toggleSpikelines",
	      "togglehover", "togglespikelines", "toimage", "zoom", "zoom2d",
	      "zoom3d", "zoomIn2d", "zoomInGeo", "zoomInMapbox", "zoomOut2d",
	      "zoomOutGeo", "zoomOutMapbox", "zoomin", "zoomout"]
  },
  grid: {columns: 1, rows: 1}, xaxis: {showgrid: false}, yaxis: {showgrid: false}
};

const PortfolioGraph = () => {
  const userPortfolio = useSelector(state => state.portfolio);
  const [portfolio, setPortfolio] = useState([]);

  const constructPortfolioHistory = async (s) => {
    const priceHistories = [];
    const timeline = [];
    const today = ((new Date().getTime()) / 1000) - 3600;
    const aMonthAgo = (today - 2678400) - 3600;
    if (s.length > 0) {
      for (let {crypto_id: name, quantity} of Object.values(s)) {
	let res = await fetch(`https://api.coingecko.com/api/v3/coins/${name}/market_chart/range?vs_currency=usd&from=${aMonthAgo}&to=${today}`);
	const history = await res.json();
	if (priceHistories.length === 0) { // Construct time axis once.
	  timeline.push(...history.prices.map(p => p[0]));
	}
	priceHistories.push(history.prices.map(p => quantity * p[1]));
      }
      setPortfolio([timeline, foldData(priceHistories)]);
    }
  };

  useEffect(() => {
    constructPortfolioHistory(userPortfolio);
  }, [userPortfolio]);

    return (
      <div>
        <Plot
	  data={dataSet(portfolio)}
	  layout={customLayout}
	  useResizeHandler={true}
	  style={{ width: "100%", height: "100%"}}
	/>
      </div>
    );
};

export default PortfolioGraph
