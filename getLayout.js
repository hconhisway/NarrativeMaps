function getBoxLayout(data) {
    // console.log(data);
    let graph = new dagre.graphlib.Graph({ compound: true });
    graph.setGraph({});
    // eslint-disable-next-line
    graph.setDefaultEdgeLabel(() => { return {}; });
    const Gwidth = 270;
    const Gheight = 70;
    const label0 = "groupnode";
    graph.setNode('evidence', { label0 });
    graph.setNode('legalArgument', { label0 });
    graph.setNode('initialJudgment', { label0 });
    graph.setNode('appeal', { label0 });
    graph.setNode('outcome', { label0 });

    if ('background' in data) {
        const node = data.background[0];
        const nodeId = 'background-0';
        const width = Gwidth * 3;
        const height = Gheight * 3;
        const simple = node.simple;
        const detailed = node.detailed;
        graph.setNode(nodeId, { width, height, simple, detailed });
      }

    if ('evidence' in data) {
      for (let i = 0; i < data.evidence.length; i += 1) {
        // eslint-disable-next-line
        const node = data.evidence[i];
        const nodeId = `evidence-${i}`;
        const label = node.id;
        const width = Gwidth;
        const height = Gheight;
        const simple = node.simple;
        const detailed = node.detailed;
        graph.setNode(nodeId, { label, width, height, simple, detailed });
        graph.setEdge('background-0', nodeId);
        graph.setParent(nodeId, 'evidence');
      }
    }
  
    // get legalArgument
    if ('legalArgument' in data) {
      for (let i = 0; i < data.legalArgument.length; i += 1) {
        const node = data.legalArgument[i];
        const nodeId = `legalArgument-${i}`;
        const label = node.id;
        const width = Gwidth;
        const height = Gheight;
        const simple = node.simple;
        const detailed = node.detailed;
        graph.setNode(nodeId, { label, width, height, simple, detailed });
        for (let j = 0; j < node.relatedEvidence.length; j += 1) {
            graph.setEdge(`evidence-${node.relatedEvidence[j]-1}`, nodeId);
        }
        graph.setParent(nodeId, 'legalArgument');
      }
    }

    if ('initialJudgment' in data) {
        for (let i = 0; i < data.initialJudgment.length; i += 1) {
          // eslint-disable-next-line
          const node = data.initialJudgment[i];
          const nodeId = `initialJudgment-${i}`;
          const label = node.id;
          const width = Gwidth;
          const height = Gheight;
          const simple = node.simple;
          const detailed = node.detailed;
          graph.setNode(nodeId, { label, width, height, simple, detailed });
          for (let j = 0; j < node.relatedLegalArgument.length; j += 1) {
            graph.setEdge(`legalArgument-${node.relatedLegalArgument[j]-1}`, nodeId);
          }
          graph.setParent(nodeId, 'initialJudgment');
        }
    }
    if ('appeal' in data) {
        for (let i = 0; i < data.appeal.length; i += 1) {
            // eslint-disable-next-line
            const node = data.appeal[i];
            const nodeId = `appeal-${i}`;
            const label = node.id;
            const width = Gwidth;
            const height = Gheight;
            const simple = node.simple;
            const detailed = node.detailed;
            graph.setNode(nodeId, { label, width, height, simple, detailed });
            for (let j = 0; j < data.initialJudgment.length; j += 1) {
                graph.setEdge(`initialJudgment-${j}`, nodeId);
            }
            graph.setParent(nodeId, 'appeal');
        }
    }
    if ('outcome' in data) {
        for (let i = 0; i < data.outcome.length; i += 1) {
            // eslint-disable-next-line
            const node = data.outcome[i];
            const nodeId = `outcome-${i}`;
            const label = node.id;
            const width = Gwidth;
            const height = Gheight;
            const simple = node.simple;
            const detailed = node.detailed;
            graph.setNode(nodeId, { label, width, height, simple, detailed });
            for (let j = 0; j < data.appeal.length; j += 1) {
              graph.setEdge(`appeal-${j}`, nodeId);
          }
            graph.setParent(nodeId, 'outcome');
        }
    }
  
    
    graph.setGraph({ ranksep: 30, rankdir: 'TB' });
    dagre.layout(graph);
    // console.log(graph);
    // console.log(superNodes);
    // if (Object.keys(superNodes).length>1000) {
    //   arrangeSuperNodes(graph,superNodes);
    // }
  
    // get layout result
    const layout = {
      nodes: {},
      edges: [],
    };
    // console.log(data);
    graph.nodes().forEach((nodeId) => {
      const node = graph.node(nodeId);
      layout.nodes[nodeId] = {
        x: node.x,
        y: node.y,
        width: node.width,
        height: node.height,
        label: node.label,
        simple: node.simple,
        detailed: node.detailed
      };
    });
    graph.edges().forEach((edge, i) => {
      layout.edges.push({
        id: i,
        source: edge.v,
        target: edge.w,
      });
    });
  
    // console.log(layout);
    // set meta data for layout
    // layout.meta = {};
    // layout.meta.name = data.b[0].name;
    // layout.meta.identifier = `${data.b[0].function_type}-${data.b[0].metadata}`;
    // layout.meta.type = data.b[0].function_type;
    return layout;
  }
  