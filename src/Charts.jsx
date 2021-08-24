import React, {useContext, useEffect} from "react";
import DataContext  from './data';
import * as d3 from 'd3';
import _ from 'lodash';
 

function Charts() {
    const items = useContext(DataContext);
    var data = items.data.map(item => item.Product_SUBCategory);
    const count = {};
    data.forEach((el) => {
    count[el] = count[el] + 1 || 1
    });
    console.log(count);

    const k = Object.keys(count);
    const v = Object.values(count);


  const chartData = k.map((value,i) =>({label: value, value: v[i]}));

  console.log(chartData);

    const innerRadius = 150;
    const outerRadius = 300;

    const margin = {
        top: 50, right: 50, bottom: 50, left: 50,
    };

    const width = 2 * outerRadius + margin.left + margin.right;
    const height = 2 * outerRadius + margin.top + margin.bottom;

    const colorScale = d3     
    .scaleSequential()      
    .interpolator(d3.interpolateCool)      
    .domain([0, chartData.length]);

    useEffect(() => {
        drawChart();
    },[chartData]);

    function drawChart(){
       d3.select('#pie-chart')
        .select('svg')
        .remove();

        const svg = d3
              .select('#pie-chart')
              .append('svg')
              .attr('width',width)
              .attr('height',height)
              .append('g')
              .attr('transform',`translate(${width/2},${height/2})`);

        const arcGenerator = d3
               .arc()
               .innerRadius(innerRadius)
               .outerRadius(outerRadius)

       const pieGenerator = d3
                 .pie()
                 .padAngle(0)
                 .value((d) => d.value);

        const arc = svg
               .selectAll()
               .data(pieGenerator(chartData))
               .enter();

        
           arc.append('path')
              .attr('d',arcGenerator)
              .style('fill',(_, i) => colorScale(i))
              .style('stroke','#fff')
              .style('stroke-width',0);


        arc.append('text')
           .attr('text-anchor','middle')
           .attr('alignment-baseline','middle')
           .text((d) => d.data.label)
           .style('fill', "#fff ")
           .attr('transform', (d) => {
            const [x, y] = arcGenerator.centroid(d);
            return `translate(${x}, ${y})`;
          });

    }


    if(items.fileLoaded){
        return(
            <div id="pie-chart" />
        )
    }

    else return null;

}


export default Charts;