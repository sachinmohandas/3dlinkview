'use strict';

var app = angular.module('threeDLinks', []);

app.controller('threeDController', function ($scope) {
    console.log('executing config controller');
    /*    function getGraphDataSets() {

            const loadMiserables = function(Graph) {
                Graph
                    .cooldownTicks(200)
                    .nodeLabel('id')
                    .nodeAutoColorBy('group')
                    .forceEngine('ngraph')
                    .jsonUrl('./components/controllers/data.json');
            };



            const loadBlocks = function(Graph) {
                fetch('./components/controllers/blocks.json').then(r => r.json()).then(data => {
                    data.nodes.forEach(node => { node.name = `${node.user?node.user+': ':''}${node.description || node.id}` });

                    Graph
                        .cooldownTicks(300)
                        .cooldownTime(20000)
                        .nodeAutoColorBy('user')
                        .forceEngine('ngraph')
                        .graphData(data);
                });
            };
            loadBlocks.description = "<em>Blocks</em> data (<a href='https://bl.ocks.org/mbostock/afecf1ce04644ad9036ca146d2084895'>afecf1ce04644ad9036ca146d2084895</a>)";

            //

            const loadD3Dependencies = function(Graph) {
                fetch('.d3.csv').then(r => r.text()).then(d3.csvParse).then(data => {
                    const nodes = [], links = [];
                    data.forEach(({ size, path }) => {
                        const levels = path.split('/'),
                            module = levels.length > 1 ? levels[1] : null,
                            leaf = levels.pop(),
                            parent = levels.join('/');

                        nodes.push({
                            path,
                            leaf,
                            module,
                            size: +size || 1
                        });

                        if (parent) {
                            links.push({ source: parent, target: path});
                        }
                    });

                    Graph
                        .cooldownTicks(300)
                        .nodeRelSize(0.5)
                        .nodeId('path')
                        .nodeVal('size')
                        .nodeLabel('path')
                        .nodeAutoColorBy('module')
                        .forceEngine('ngraph')
                        .graphData({ nodes: nodes, links: links });
                });
            };
            loadD3Dependencies.description = "<em>D3 dependencies</em> data (<a href='https://bl.ocks.org/mbostock/9a8124ccde3a4e9625bc413b48f14b30'>9a8124ccde3a4e9625bc413b48f14b30</a>)";

            const tunnel = function(Graph) {

                const perimeter = 12, length = 30;

                const getId = (col, row) => `${col},${row}`;

                let nodes = [], links = [];
                for (let colIdx=0; colIdx<perimeter; colIdx++) {
                    for (let rowIdx=0; rowIdx<length; rowIdx++) {
                        const id = getId(colIdx, rowIdx);
                        nodes.push({id});

                        // Link vertically
                        if (rowIdx>0) {
                            links.push({ source: getId(colIdx, rowIdx-1), target: id });
                        }

                        // Link horizontally
                        links.push({ source: getId((colIdx || perimeter) - 1, rowIdx), target: id });
                    }
                }

                Graph
                    .cooldownTicks(300)
                    .forceEngine('ngraph')
                    .graphData({ nodes: nodes, links: links });
            };
            tunnel.description = "fabric data for a cylindrical tunnel shape";

            //

            return [loadMiserables, loadBlocks, loadD3Dependencies, tunnel];
        }

        const Graph = ForceGraph3D()
        (document.getElementById("3d-graph"));

        let curDataSetIdx;
        const dataSets = getGraphDataSets();

        let toggleData;
        (toggleData = function() {
            curDataSetIdx = curDataSetIdx === undefined ? 0 : (curDataSetIdx+1)%dataSets.length;
            const dataSet = dataSets[curDataSetIdx];

            Graph.resetProps(); // Wipe current state
            dataSet(Graph); // Load data set

        })(); // IIFE init*/
    /*  const imgs = [{src: 'human_aqua.png'}, {src: 'human_green.png'}, {src: 'human_aqua.png'}, {src: 'org_aqua.png'}, {src: 'human_aqua.png'}, {src: 'human_aqua.png'}
      , {src: 'human_aqua.png'},{src: 'org_aqua.png', color: '#fff'}, {src: 'org_aqua.png'}, {src: 'human_aqua.png'}, {src: 'human_aqua.png'}, {src: 'org_aqua.png'}, {src: 'human_aqua.png'}, {src: 'human_aqua.png'}
          , {src: 'doc_aqua.png'},{src: 'human_aqua.png', color: '#fff'}, {src: 'doc_aqua.png'}, {src: 'vechicle_aqua.png'}, {src: 'human_aqua.png'}, {src: 'human_aqua.png'}, {src: 'human_aqua.png'}, {src: 'human_aqua.png'}
          , {src: 'human_aqua.png'},{src: 'org_aqua.png', color: '#fff'}, {src: 'vehicle_aqua.png'}, {src: 'human_aqua.png'}, {src: 'org_aqua.png'}, {src: 'doc_aqua.png'}, {src: 'human_aqua.png'}, {src: 'human_aqua.png'}
          , {src: 'vechicle_aqua.png'},{src: 'doc_aqua.png', color: '#fff'}, {src: 'human_aqua.png'}, {src: 'human_aqua.png'}, {src: 'human_aqua.png'}, {src: 'doc_aqua.png'}, {src: 'doc_aqua.png'}, {src: 'human_aqua.png'}
          , {src: 'human_aqua.png'},{src: 'vechicle_aqua.png', color: '#fff'}, {src: 'human_aqua.png'}, {src: 'doc_aqua.png'}, {src: 'human_aqua.png'}, {src: 'human_aqua.png'}, {src: 'human_aqua.png'}, {src: 'human_aqua.png'}
          , {src: 'org_aqua.png'},{src: 'human_aqua.png', color: '#fff'}, {src: 'vechicle_aqua.png'}, {src: 'human_aqua.png'}, {src: 'human_aqua.png'}, {src: 'org_aqua.png'}, {src: 'human_aqua.png'}, {src: 'human_aqua.png'}
          , {src: 'doc_aqua.png'},{src: 'org_aqua.png', color: '#fff'}];

*/
      $scope.links = [{text: 'Links Information', icon: 'link_info'}, {text: 'Direct Links', icon: 'direct'}, {text: 'Relation', icon: 'relation'}, {text: 'Vertical Hierarchy', icon: 'vertical_hierarchy'}, {text: 'Horizontal Hierarchy', icon: 'horizontal_hierarchy'}, {text: 'Unhide Entity', icon: 'unhide_entity'}, {text: 'Hide Entity', icon: 'hide_entity'}, {text: 'Show Abstract', value: 'abstract', icon: 'show_abstract'}, {text: 'Display Photo', icon: 'display_photo'}, {text: 'Print', icon: 'print'}, {text: 'Save', icon: 'save'}];



     /* const LEVELS_GAP = 220;
      const HEIGHT_OFFSET = 400;
      const NODE_REL_SIZE = 1;

      d3.csv('./components/controllers/d3-dependencies.csv').then(data => {
          const nodes = [], links = [];
          data.forEach(({ size, path }) => {
              const levels = path.split('/'),
                  level = levels.length - 1,
                  module = level > 0 ? levels[1] : null,
                  leaf = levels.pop(),
                  parent = levels.join('/');

              const node = {
                  path,
                  leaf,
                  module,
                  size: +size || 20,
                  fy: HEIGHT_OFFSET -level * LEVELS_GAP
              };

              nodes.push(node);

              if (parent) {
                  links.push({ source: parent, target: path, targetNode: node });
              }
          });

          const elem = document.getElementById('3d-graph');

          ForceGraph3D()
              .nodeRelSize(NODE_REL_SIZE)
              .nodeId('path')
              .nodeVal('size')
              .nodeLabel('path')
              .nodeAutoColorBy('module')
              .nodeOpacity(0.9)
              .linkColor(d => d.targetNode.color)
              .onNodeHover(node => elem.style.cursor = node ? 'pointer' : null)
              .onNodeClick(node => {
                  const levels = node.path.split('/');
                  if (levels.length > 2) { levels.splice(2, 0, 'tree/master/src'); } // Format github path
                  window.open(`https://github.com/${levels.join('/')}`, '_blank')
              })
              .d3Force('collision', d3.forceCollide(node => Math.cbrt(node.size) * NODE_REL_SIZE))
              .graphData({ nodes: nodes, links: links })
              (elem);
      });

  */
    const data = "./moreImages.json";
    const lessdata = "./images.json";
    const mediumdata = "./mediumimages.json";
    drawGraph(lessdata);
    $scope.getDocuments = function () {
        drawGraph(lessdata);
    };
    $scope.getBinders= function () {
        drawGraph(data);
    };
    $scope.getAlerts = function () {
        drawGraph(mediumdata);
    };
    function drawGraph(data) {
        $.getJSON(data, function (json) {
            // console.log(json);
            const imgs = json;// this will show the info it in firebug console
            const gData = {
                nodes: imgs.map((img, id) => ({id, img})),
                links: [...Array(imgs.length).keys()]
                    .filter(id => id)
                    .map(id => ({
                        source: id,
                        target: Math.round(Math.random() * (id - 1))
                    }))
            };
            gData.links.forEach(link => {
                const a = gData.nodes[link.source];
                const b = gData.nodes[link.target];
                !a.neighbors && (a.neighbors = []);
                !b.neighbors && (b.neighbors = []);
                a.neighbors.push(b);
                b.neighbors.push(a);

                !a.links && (a.links = []);
                !b.links && (b.links = []);
                a.links.push(link);
                b.links.push(link);
            });
            // Random connected graph


            const highlightNodes = new Set();
            const highlightLinks = new Set();
            let hoverNode = null;
            let selectedNodes = new Set();
            const Graph = ForceGraph3D()
            (document.getElementById('3d-graph'))
                .nodeAutoColorBy('group')
                .backgroundColor('#080f15')
                .onNodeClick((node, event) => {
                    if (!$scope.multiSelect) {
                        nodeIconClick();
                        // Aim at node from outside it
                        const distance = 40;
                        const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
                        Graph.cameraPosition(
                            {x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio}, // new position
                            node, // lookAt ({ x, y, z })
                            3000  // ms transition duration
                        );
                    } else {
                        if (event.ctrlKey || event.shiftKey || event.altKey) { // multi-selection
                            selectedNodes.has(node) ? selectedNodes.delete(node) : selectedNodes.add(node);
                            multiNodeIconClick(node.id);

                        } else { // single-selection
                            const untoggle = selectedNodes.has(node) && selectedNodes.size === 1;
                            selectedNodes.clear();
                            !untoggle && selectedNodes.add(node);
                        }
                        // console.log(node.img.src, node.id, $scope.nodeList);
                    }
                    Graph.nodeColor(Graph.nodeColor());
                })
                .onLinkClick((link, event) => {
                    linkClick();
                    console.log(link);
                })
                .nodeThreeObject(({img}) => {
                    const imgTexture = new THREE.TextureLoader().load(`./assets/img/${img.src}`);
                    // console.log(imgTexture);
                    const material = new THREE.SpriteMaterial({map: imgTexture});
                    const sprite = new THREE.Sprite(material);
                    sprite.color = img.color;
                    sprite.scale.set(12, 12);
                    return sprite;
                })
                .linkWidth(link => highlightLinks.has(link) ? 4 : 1)
                .linkDirectionalParticles(link => highlightLinks.has(link) ? 4 : 0)
                .linkDirectionalParticleWidth(4)
                .onNodeHover(node => {
                    // no state change
                    if ((!node && !highlightNodes.size) || (node && hoverNode === node)) return;

                    highlightNodes.clear();
                    highlightLinks.clear();
                    if (node) {
                        highlightNodes.add(node);
                        node.neighbors.forEach(neighbor => highlightNodes.add(neighbor));
                        node.links.forEach(link => highlightLinks.add(link));
                    }

                    hoverNode = node || null;

                    updateHighlight();
                })
                .onLinkHover(link => {
                    highlightNodes.clear();
                    highlightLinks.clear();

                    if (link) {
                        highlightLinks.add(link);
                        highlightNodes.add(link.source);
                        highlightNodes.add(link.target);
                    }

                    updateHighlight();
                })
                .cooldownTicks(100)
                .graphData(gData);

            // Spread nodes a little wider
            Graph.d3Force('charge').strength(-120);

            Graph.onEngineStop(() => {
                if ($scope.zoomtoFit) {
                    Graph.zoomToFit(400);
                }
            });


            function updateHighlight() {
                // trigger update of highlighted objects in scene
                Graph
                    .nodeColor(Graph.nodeColor())
                    .linkWidth(Graph.linkWidth())
                    .linkDirectionalParticles(Graph.linkDirectionalParticles());
            }
        });
    }

    $scope.abstractList = [{title: 'System ID', value: '3524488', type: 'sysID'}, {title: 'Status', value: 'Identified'}, {title: 'Name', value: 'Robert William'}, {title: 'Age', value: '35'}, {title: 'Gender', value: 'Male'}, {title: 'Date Of Birth', value: '11/10/1987'}, {title: 'UDB ID', value: '1246854455'}, {title: 'Restriction Status', value: 'Allowed'}];

    $scope.tableData = [{text1: 'Link1', text2: 'Link1', text3: 'Link1', text4: 'Link1', text5: 'Link1', text6: 'Link1'}, {text1: 'Link1', text2: 'Link1', text3: 'Link1', text4: 'Link1', text5: 'Link1', text6: 'Link1'}, {text1: 'Link1', text2: 'Link1', text3: 'Link1', text4: 'Link1', text5: 'Link1', text6: 'Link1'}, {text1: 'Link1', text2: 'Link1', text3: 'Link1', text4: 'Link1', text5: 'Link1', text6: 'Link1'}];

    $scope.nodeClick = function (linkValue) {
        if(linkValue === 'abstract'){
            $scope.abstractCont = true;
            $('.abstract-cont').show();
            $('.abstract-selected-nodes').hide();
        }
    };

    function linkClick() {
        $('.td-link-area').slideDown();
        $('.td-link-area').show();
    }

    $scope.abstractClose = function () {
        $('.td-abstract').fadeOut();
        $scope.zoomtoFit = true;
        $scope.nodeList = [];
        setTimeout(function () {
            $scope.zoomtoFit = false;
        },100)
    };

    $scope.linkClose = function () {
        $('.td-link-area').slideUp();
    };

    function nodeIconClick() {
        $('.td-abstract').fadeIn();
        $('.abstract-cont').show();
        $('.abstract-selected-nodes').hide();

    }
    function multiNodeIconClick(id) {
        $('.td-abstract').fadeIn();
        $('.abstract-cont').hide();
        $('.abstract-selected-nodes').show();
        $scope.nodeList.push(id);
        $scope.$apply();
        console.log($scope.nodeList);
    }
    $scope.sideMenuClick = function () {
        $scope.viewSideMenu = !$scope.viewSideMenu;
    };
    $scope.multiSelectClick = function () {
        if($scope.multiSelectValue === 'off'){
            $scope.multiSelectValue = 'on';
            $scope.multiSelect = true;
            $scope.zoomtoFit = true;
            setTimeout(function () {
                $scope.zoomtoFit = false;
            },1000)
        }
        else {
            $scope.multiSelectValue = 'off';
            $scope.multiSelect = false;
        }
    };
    $scope.selectFilter = function() {
        $scope.filterCont = !$scope.filterCont;
    };
    $scope.multiSelectValue = 'off';
    $scope.multiSelect = false;
    $scope.abstractCont = true;
    $scope.zoomtoFit = false;
     $scope.nodeList = [];
});
