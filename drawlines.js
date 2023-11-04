function drawlines (layout) {
    const nodes = layout.nodes;
    const svg = d3.select("#mainsvg");
    const g = svg.select("#sumGroup");
    g.append("defs")
      .append("marker")
      .attr("id", "arrowhead")
      .attr("markerWidth", 10)
      .attr("markerHeight", 7)
      .attr("refX", 10)
      .attr("refY", 3.5)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,0 L10,3.5 L0,7 Z")
      .style("fill", "#023047");
    const edges = layout.edges;
    edges.forEach((edge) => {
      const sourceNode = nodes[edge.source];
      const targetNode = nodes[edge.target];
      if (edge.source!=='background-0' && !edge.source.includes("initialJudgment") && !edge.source.includes("appeal")) {
        g.append("line")
        .attr("x1", sourceNode.x)
        .attr("y1", sourceNode.y + sourceNode.height / 2)
        .attr("x2", targetNode.x)
        .attr("y2", targetNode.y - targetNode.height / 2)
        .style("stroke", "#023047")
        .style("stroke-width", 2.2)
        .style("opacity", 0.5)
        .attr("marker-end", "url(#arrowhead)");
      }
    });

    drawLinesXD(nodes["background-0"], nodes["evidence"], "#023047");
    drawLinesXD(nodes["initialJudgment"], nodes["appeal"], "#023047");
    drawLinesXD(nodes["appeal"], nodes["outcome"], "#023047");

}

function drawLinesXD(source, target, color) {
    let sourceX = source.x;
    let sourceY = source.y + source.height / 2;
    let targetX1 = target.x - target.width / 2;
    let targetX2= target.x + target.width / 2;
    let targetY1 = target.y - target.height / 2;
    let targetY2 = target.y - target.height / 2;
    let dx1 = targetX1 - sourceX;
    let dy1 = targetY1 - sourceY;
    let  dx2 = targetX2 - sourceX;
    let dy2 = targetY2 - sourceY;
    let  controlPoint11 = {};
    let controlPoint12 = {};
    let controlPoint21 = {};
    let  controlPoint22 = {};
      controlPoint11.x = sourceX + 0.25 * 1.5 * dx1;
      controlPoint11.y = sourceY + 0.25 * 1.2 * dy1;
      controlPoint12.x = sourceX + 0.75 * 0.8 * dx1;
      controlPoint12.y = sourceY + 0.75 * 1.0 * dy1;
      controlPoint21.x = sourceX + 0.25 * 1.5 * dx2;
      controlPoint21.y = sourceY + 0.25 * 1.2 * dy2;
      controlPoint22.x = sourceX + 0.75 * 0.8 * dx2;
      controlPoint22.y = sourceY + 0.75 * 1.0 * dy2;
  
    const g = d3.select('svg').select('#sumGroup').append("g").style("opacity", 0.5).attr('id', 'lineXD');
  
    const paddingL = 27;

    g.attr("color", color);

    let data1 = [
        {x: sourceX, y: sourceY},
        {x: controlPoint11.x, y: controlPoint11.y},
        {x: controlPoint12.x, y: controlPoint12.y},
        {x: targetX1 + paddingL, y: targetY1}
      ];
  
     let data2 = [
        {x: sourceX, y: sourceY},
        {x: controlPoint21.x, y: controlPoint21.y},
        {x: controlPoint22.x, y: controlPoint22.y},
        {x: targetX2 - paddingL, y: targetY2}
      ];
    
    let lineGenerator = d3.line()
      .x(function(d) { return d.x; })
      .y(function(d) { return d.y; })
      .curve(d3.curveBasis);
  
    let pathString1 = lineGenerator(data1);
    let pathElement1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathElement1.setAttribute('d', pathString1);

    let pathString2 = lineGenerator(data2);
    let pathElement2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathElement2.setAttribute('d', pathString2);
    
    let totalLength1 = pathElement1.getTotalLength();
    let totalLength2 = pathElement2.getTotalLength();

    const numPoints = 500;

    let points1 = [];
    for (let i = 0; i < numPoints; i++) {
        let point = pathElement1.getPointAtLength(i * totalLength1 / (numPoints - 1));
        points1.push({x: point.x, y: point.y});
    }

    let points2 = [];
    for (let i = 0; i < numPoints; i++) {
        let point = pathElement2.getPointAtLength(i * totalLength2 / (numPoints - 1));
        points2.push({x: point.x, y: point.y});
    }

    let xScale1 = d3.scaleLinear()
    .domain(d3.extent(data1, function(d) { return d.y; }))
    .range([0, dy1]);

    let bisect1 = d3.bisector(function(d) { return d.y; }).left;

    let xScale2 = d3.scaleLinear()
    .domain(d3.extent(data2, function(d) { return d.y; }))
    .range([0, dy1]);

    let  bisect2 = d3.bisector(function(d) { return d.y; }).left;

    let  area1 = d3.area()
        .y(function(d) { return d.y; })
        .x0( d => {
          const yValue = d.y;
          let indexOfNode = bisect1(points1, xScale1.invert(yValue));
          if(indexOfNode >= points1.length - 1) indexOfNode = points1.length - 2;
          if(indexOfNode < 1) indexOfNode = 1;
          let pointBefore = points1[indexOfNode - 1];
          let pointAfter = points1[indexOfNode + 1];
          let slope = Math.abs((pointAfter.x - pointBefore.x) / (pointAfter.y - pointBefore.y));
          // let slope = 0;
          let linewidth = 2.7 * Math.pow(((d.y - sourceY + 2) / dy1), 0.38);
          return d.x - Math.sqrt(1+slope**2) * linewidth;
        })
        .x1( d => {
          const yValue = d.y;
          let indexOfNode = bisect1(points1, xScale1.invert(yValue));
          if(indexOfNode >= points1.length - 1) indexOfNode = points1.length - 2;
          if(indexOfNode < 1) indexOfNode = 1;
          let pointBefore = points1[indexOfNode - 1];
          let pointAfter = points1[indexOfNode + 1];
          let slope = Math.abs((pointAfter.x - pointBefore.x) / (pointAfter.y - pointBefore.y));
          // let slope = 0;
          let linewidth = 2.7 * Math.pow(((d.y - sourceY + 2) / dy1), 0.38);
          return d.x + Math.sqrt(1+slope**2) * linewidth;
        })
        .curve(d3.curveBasis);

    let area2 = d3.area()
        .y(function(d) { return d.y; })
        .x0( d => {
          const yValue = d.y;
          let indexOfNode = bisect2(points2, xScale2.invert(yValue));
          if(indexOfNode >= points2.length - 1) indexOfNode = points2.length - 2;
          if(indexOfNode < 1) indexOfNode = 1;
          let pointBefore = points2[indexOfNode - 1];
          let pointAfter = points2[indexOfNode + 1];
          let slope = Math.abs((pointAfter.x - pointBefore.x) / (pointAfter.y - pointBefore.y));
          // let slope = 0;
          let linewidth = 2.7 * Math.pow(((d.y - sourceY + 2) / dy2), 0.38);
          return d.x - Math.sqrt(1+slope**2) * linewidth;
        })
        .x1(d => {
          const yValue = d.y;
          let indexOfNode = bisect2(points2, xScale2.invert(yValue));
          if(indexOfNode >= points2.length - 1) indexOfNode = points2.length - 2;
          if(indexOfNode < 1) indexOfNode = 1;
          let pointBefore = points2[indexOfNode - 1];
          let pointAfter = points2[indexOfNode + 1];
          let slope = Math.abs((pointAfter.x - pointBefore.x) / (pointAfter.y - pointBefore.y));
          // let slope = 0;
          let linewidth = 2.7 * Math.pow(((d.y - sourceY + 2) / dy2), 0.38);
          return d.x + Math.sqrt(1+slope**2) * linewidth;
        })
        .curve(d3.curveBasis);

    let path1 = g.append("path")
    .datum(data1)
    .attr("d", area1)
    .attr('id', 'path1')
    .attr("fill", color);
  
    let path2 = g.append("path")
    .datum(data2)
    .attr("d", area2)
    .attr('id', 'path2')
    .attr("fill", color);

  }