function drawBox(layout) {
    const svg = d3.select("#mainsvg");
    const g = svg.select("#sumGroup");
    const ranksep = 37;
    const padding = 22.5;
    const nodes = layout.nodes;
    for (const nodeId in nodes) {
      const node = nodes[nodeId];
      const [type, index] = nodeId.split("-");
      const isBackround = (type === "background");
      const isEvidence = (type === "evidence");
      const isInitialJudgment = (type === "initialJudgment");
      const isLegalArgument = (type === "legalArgument");
      const isOutcome = (type === "outcome");
      const isAppeal = (type === "appeal");
      if (isBackround && index!== undefined) {
        drawBackGround(node, nodeId, g, '#a7c957');
      } else if (isEvidence && index !== undefined) {
        drawEvidence(node, nodeId, g, '#8ecae6');
      } else if (isEvidence && index === undefined) {
        drawEvidenceG(node, nodeId, g, "#8ecae6");
      } else if (isInitialJudgment && index!== undefined) {
        drawInitialJudgment(node, nodeId, g, "#ffb703");
      } else if (isInitialJudgment && index=== undefined) {
        drawInitialJudgmentG(node, nodeId, g, "#ffb703");
      } else if (isLegalArgument && index!== undefined) {
        drawLegalArgument(node, nodeId, g, "#219ebc");
      } else if (isLegalArgument && index=== undefined) {
        drawLegalArgumentG(node, nodeId, g, "#219ebc");
      } else if (isOutcome && index!== undefined) {
        drawOutcome(node, nodeId, g, "#fb8500");
      } else if (isOutcome && index=== undefined) {
        drawOutcomeG(node, nodeId, g, "#fb8500");
      } else if (isAppeal && index!== undefined) {
        drawAppeal(node, nodeId, g, "#023047");
      } else if (isAppeal && index === undefined) {
        drawAppealG(node, nodeId, g, "#023047");
      }
    }

    const textsData = ["Background", "Evidence", "Legal Argument", "Initial Judgement", "Appeal", "Final Judgement"];
    let leftest = 2000;
    const yValueOfTexts = [nodes["background-0"].y, nodes["evidence"].y, nodes["legalArgument"].y, nodes["initialJudgment"].y, nodes["appeal"].y, nodes["outcome"].y ];
    const xValueOfTexts = [nodes["background-0"].x - nodes["background-0"].width / 2, nodes["evidence"].x - nodes["evidence"].width / 2, nodes["legalArgument"].x - nodes["legalArgument"].width / 2, nodes["initialJudgment"].x - nodes["initialJudgment"].width / 2, nodes["appeal"].x - nodes["appeal"].width / 2, nodes["outcome"].x - nodes["outcome"].width / 2 ];
    for (const nodeId in nodes) {
        const node = nodes[nodeId];
        const leftMost = node.x - node.width / 2;
        if (leftMost<leftest) {
            leftest = leftMost;
        }
    }
    const colorMap = ["#a7c957", "#8ecae6", "#219ebc", "#ffb703", "#023047", "#fb8500"];
    const leftTexts = g.selectAll(".leftText")
    .data(textsData)
    .enter().append("text")
    .attr("class", "leftText")
    .attr("x", leftest - 400) // or a negative value if you want more space
    .attr("y", (d, i) => yValueOfTexts[i]) // adjust this based on your desired vertical spacing
    .style("fill", (d, j) => colorMap[j])
    .style("font-weight", "bold")
    .text(d => d);

    const bboxes = leftTexts.nodes().map(text => text.getBBox());

    g.selectAll(".dashed-line")
    .data(textsData)
    .enter().append("line")
    .attr("class", "dashed-line")
    .attr("x1", (d, i) => bboxes[i].x + bboxes[i].width * 2)
    .attr("y1", (d, i) => yValueOfTexts[i])
    .attr("x2", (d, i) => xValueOfTexts[i] - 20)
    .attr("y2", (d, i) => yValueOfTexts[i])
    .style("stroke", (d, j) => colorMap[j])
    .style("stroke-width", 5)
    .style("stroke-dasharray", "10,10");  // 设置为虚线，"5,5"表示线和间隙的长度

    // Style the texts as required
    leftTexts
    .style("font-size", "30px");
  }

  function drawBackGround(node, nodeId, g, color='grey') {
    let clicked = false;
    const selection = g.append("rect")
    .attr("id", nodeId)
    .attr("x", node.x - node.width / 2)
    .attr("y", node.y - node.height / 2)
    .attr("width", node.width)
    .attr("height", node.height)
    .attr("rx", 15)
    .attr("ry", 15)
    .style("fill", "rgba(0, 0, 255, 0)")
    .style("cursor", "pointer")
    .style("stroke", color)
    .style("stroke-width", 5);
    let nodeText = g.append("text")
    .attr("x", node.x)
    .attr("y", node.y - node.height / 4 / 2)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .style("font-size", "22px")
    .text(node.detailed);
  wrapText(nodeText, node.width - 2, 22);
    if (node.body !== undefined) {
      selection.on("click", function(){
        // handleClick(fnS, node.body, body_num, nodeId, color, clicked, direction);
        clicked = !clicked;
      });
    }
  }

  function drawEvidence(node, nodeId, g, color='grey') {
    let clicked = false;
    const selection = g.append("rect")
    .attr("id", nodeId)
    .attr("x", node.x - node.width / 2)
    .attr("y", node.y - node.height / 2)
    .attr("width", node.width)
    .attr("height", node.height)
    .attr("rx", 15)
    .attr("ry", 15)
    .style("fill", "white")
    .style("cursor", "pointer")
    .style("stroke", color)
    .style("stroke-width", 5);
    let nodeText = g.append("text")
      .attr("x", node.x)
      .attr("y", node.y - node.height / 4 / 2)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .style("font-size", "22px")
      .text(node.simple);
    wrapText(nodeText, node.width - 2, 22);
    if (node.body !== undefined) {
      selection.on("click", function(){
        // handleClick(fnS, node.body, body_num, nodeId, color, clicked, direction);
        clicked = !clicked;
      });
    }
  }

  function drawEvidenceG(node, nodeId, g, color='grey') {
    let clicked = false;
    const selection = g.append("rect")
    .attr("id", nodeId)
    .attr("x", node.x - node.width / 2)
    .attr("y", node.y - node.height / 2)
    .attr("width", node.width)
    .attr("height", node.height)
    .attr("rx", 15)
    .attr("ry", 15)
    .style("fill", color)
    .style("opacity", 0.3)
    .style("cursor", "pointer")
    .style("stroke", color)
    .style("stroke-width", 5);
      g.append("text") // 添加节点的label
      .attr("x", node.x)
      .attr("y", node.y - node.height / 4 / 2)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .style("font-size", "22px")
      .text(node.simple);
    if (node.body !== undefined) {
      selection.on("click", function(){
        // handleClick(fnS, node.body, body_num, nodeId, color, clicked, direction);
        clicked = !clicked;
      });
    }
  }

  function drawInitialJudgment(node, nodeId, g, color='grey') {
    let clicked = false;
    const selection = g.append("rect")
    .attr("id", nodeId)
    .attr("x", node.x - node.width / 2)
    .attr("y", node.y - node.height / 2)
    .attr("width", node.width)
    .attr("height", node.height)
    .attr("rx", 15)
    .attr("ry", 15)
    .style("fill", "white")
    .style("cursor", "pointer")
    .style("stroke", color)
    .style("stroke-width", 5);
    let nodeText = g.append("text")
    .attr("x", node.x)
    .attr("y", node.y - node.height / 4 / 2)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .style("font-size", "22px")
    .text(node.simple);
  wrapText(nodeText, node.width - 2, 22);
    if (node.body !== undefined) {
      selection.on("click", function(){
        // handleClick(fnS, node.body, body_num, nodeId, color, clicked, direction);
        clicked = !clicked;
      });
    }
  }

  function drawInitialJudgmentG(node, nodeId, g, color='grey') {
    let clicked = false;
    const selection = g.append("rect")
    .attr("id", nodeId)
    .attr("x", node.x - node.width / 2)
    .attr("y", node.y - node.height / 2)
    .attr("width", node.width)
    .attr("height", node.height)
    .attr("rx", 15)
    .attr("ry", 15)
    .style("fill", color)
    .style("opacity", 0.3)
    .style("cursor", "pointer")
    .style("stroke", color)
    .style("stroke-width", 5);
      g.append("text") // 添加节点的label
      .attr("x", node.x)
      .attr("y", node.y - node.height / 4 / 2)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .style("font-size", "22px")
      .text(node.simple);
    if (node.body !== undefined) {
      selection.on("click", function(){
        // handleClick(fnS, node.body, body_num, nodeId, color, clicked, direction);
        clicked = !clicked;
      });
    }
  }

  function drawLegalArgument(node, nodeId, g, color='grey') {
    let clicked = false;
    const selection = g.append("rect")
    .attr("id", nodeId)
    .attr("x", node.x - node.width / 2)
    .attr("y", node.y - node.height / 2)
    .attr("width", node.width)
    .attr("height", node.height)
    .attr("rx", 15)
    .attr("ry", 15)
    .style("fill", "white")
    .style("cursor", "pointer")
    .style("stroke", color)
    .style("stroke-width", 5);
    if (node.label !== undefined){
        let nodeText = g.append("text")
        .attr("x", node.x)
        .attr("y", node.y - node.height / 4 / 2)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .style("font-size", "22px")
        .text(node.simple);
      wrapText(nodeText, node.width - 2, 22);
    }
    if (node.body !== undefined) {
      selection.on("click", function(){
        // handleClick(fnS, node.body, body_num, nodeId, color, clicked, direction);
        clicked = !clicked;
      });
    }
  }

  function drawLegalArgumentG(node, nodeId, g, color='grey') {
    let clicked = false;
    const selection = g.append("rect")
    .attr("id", nodeId)
    .attr("x", node.x - node.width / 2)
    .attr("y", node.y - node.height / 2)
    .attr("width", node.width)
    .attr("height", node.height)
    .attr("rx", 15)
    .attr("ry", 15)
    .style("fill", color)
    .style("opacity", 0.3)
    .style("cursor", "pointer")
    .style("stroke", color)
    .style("stroke-width", 5);
    if (node.label !== undefined){
      g.append("text") // 添加节点的label
      .attr("x", node.x)
      .attr("y", node.y - node.height / 4 / 2)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .style("font-size", "22px")
      .text(node.simple);
    }
    if (node.body !== undefined) {
      selection.on("click", function(){
        // handleClick(fnS, node.body, body_num, nodeId, color, clicked, direction);
        clicked = !clicked;
      });
    }
  }

  function drawOutcome(node, nodeId, g, color='grey') {
    let clicked = false;
    const selection = g.append("rect")
    .attr("id", nodeId)
    .attr("x", node.x - node.width / 2)
    .attr("y", node.y - node.height / 2)
    .attr("width", node.width)
    .attr("height", node.height)
    .attr("rx", 15)
    .attr("ry", 15)
    .style("fill", "white")
    .style("cursor", "pointer")
    .style("stroke", color)
    .style("stroke-width", 5);
    if (node.label !== undefined){
        let nodeText = g.append("text")
        .attr("x", node.x)
        .attr("y", node.y - node.height / 4 / 2)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .style("font-size", "22px")
        .text(node.simple);
      wrapText(nodeText, node.width - 2, 22);
    }
    if (node.body !== undefined) {
      selection.on("click", function(){
        // handleClick(fnS, node.body, body_num, nodeId, color, clicked, direction);
        clicked = !clicked;
      });
    }
  }

  function drawOutcomeG(node, nodeId, g, color='grey') {
    let clicked = false;
    const selection = g.append("rect")
    .attr("id", nodeId)
    .attr("x", node.x - node.width / 2)
    .attr("y", node.y - node.height / 2)
    .attr("width", node.width)
    .attr("height", node.height)
    .attr("rx", 15)
    .attr("ry", 15)
    .style("fill", color)
    .style("opacity", 0.3)
    .style("cursor", "pointer")
    .style("stroke", color)
    .style("stroke-width", 5);
    if (node.label !== undefined){
      let nodeText = g.append("text")
      .attr("x", node.x)
      .attr("y", node.y - node.height / 4 / 2)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .style("font-size", "22px")
      .text(node.simple);
    wrapText(nodeText, node.width - 2, 22);
  }
    if (node.body !== undefined) {
      selection.on("click", function(){
        // handleClick(fnS, node.body, body_num, nodeId, color, clicked, direction);
        clicked = !clicked;
      });
    }
  }

  function drawAppeal(node, nodeId, g, color='grey') {
    let clicked = false;
    const selection = g.append("rect")
    .attr("id", nodeId)
    .attr("x", node.x - node.width / 2)
    .attr("y", node.y - node.height / 2)
    .attr("width", node.width)
    .attr("height", node.height)
    .attr("rx", 15)
    .attr("ry", 15)
    .style("fill", "white")
    .style("cursor", "pointer")
    .style("stroke", color)
    .style("stroke-width", 5);
    if (node.label !== undefined){
        let nodeText = g.append("text")
        .attr("x", node.x)
        .attr("y", node.y - node.height / 4 / 2)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .style("font-size", "22px")
        .text(node.simple);
      wrapText(nodeText, node.width - 2, 22);
    }
    if (node.body !== undefined) {
      selection.on("click", function(){
        // handleClick(fnS, node.body, body_num, nodeId, color, clicked, direction);
        clicked = !clicked;
      });
    }
  }

  function drawAppealG(node, nodeId, g, color='grey') {
    let clicked = false;
    const selection = g.append("rect")
    .attr("id", nodeId)
    .attr("x", node.x - node.width / 2)
    .attr("y", node.y - node.height / 2)
    .attr("width", node.width)
    .attr("height", node.height)
    .attr("rx", 15)
    .attr("ry", 15)
    .style("fill", color)
    .style("opacity", 0.3)
    .style("cursor", "pointer")
    .style("stroke", color)
    .style("stroke-width", 5);
    if (node.label !== undefined){
      g.append("text") // 添加节点的label
      .attr("x", node.x)
      .attr("y", node.y - node.height / 4 / 2)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .style("font-size", "22px")
      .text(node.simple);
    }
    if (node.body !== undefined) {
      selection.on("click", function(){
        // handleClick(fnS, node.body, body_num, nodeId, color, clicked, direction);
        clicked = !clicked;
      });
    }
  }

  function wrapText(text, width, fontSize) {
    text.each(function() {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.2,
            y = text.attr("y"),
            x = text.attr("x"),
            dy = parseFloat(text.attr("dy") || 0),
            tspan = text.text(null)
                       .append("tspan")
                       .attr("x", x)
                       .attr("y", y)
                       .attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan")
                            .attr("x", x)
                            .attr("y", y)
                            .attr("dy", ++lineNumber * lineHeight + "em")
                            .text(word);
            }
        }
    });
}
