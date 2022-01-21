'use strict';

var app = angular.module('threeDLinks', []);

app.controller('threeDController', function ($scope) {
   // console.log('executing config controller');

    const data = "./moreImages.json";
    const lessdata = "./images.json";
    const mediumdata = "./mediumimages.json";
    const filterData = "./filterData.json";
    const humanData = "./humans.json";
    const orgData = "./org.json";
    const docData = "./doc.json";
    const vehicleData = "./vehicle.json";
    var workingData;
    workingData = lessdata;
    drawGraph(workingData);

    function drawGraph(data) {
        $.getJSON(data, function (json) {
            if($scope.isRelationActivated) {
                json = json.slice(0, $scope.selectedNodes.length);
            }
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
            const NODE_REL_SIZE = 1;
            const highlightNodes = new Set();
            const highlightLinks = new Set();
            let hoverNode = null;
            let selectedNodes = new Set();
            const Graph = ForceGraph3D()
            (document.getElementById('3d-graph'))
                .backgroundColor('#080f15')

                .onNodeClick((node, event) => {
                    if (!$scope.multiSelect) {
                        if(!(node.__threeObj.material.color.b === 0)) {
                            undoNode(gData.nodes);
                            node.__threeObj.material.color = {r: 0, g: 255, b: 0};
                            nodeIconClick();
                            // Aim at node from outside it
                           zoomNode(node);
                        }
                        else {
                            undoNode(gData.nodes);
                            nodeUnselectClick();
                        }
                    } else {
                         // multi-selection
                            if(!(node.__threeObj.material.color.r === 0 && node.__threeObj.material.color.b === 0)) {
                                selectedNodes.has(node) ? selectedNodes.delete(node) : selectedNodes.add(node);
                                node.__threeObj.material.color = {r: 0, g: 255, b: 0};
                                multiNodeIconClick(node.id);
                            }
                            else {
                                node.__threeObj.material.color = {r: 0, g: 255, b: 255};
                                multiNodeDeselectClick(node.id);
                            }
                    }
                })
                .onLinkClick((link, event) => {
                    linkClick();
                })
                .nodeThreeObject(({img}) => {
                    const imgTexture = new THREE.TextureLoader().load(`./assets/img/${img.src}`);

                    // imgTexture.image.color = img.color;
                    const material = new THREE.SpriteMaterial({map: imgTexture});
                    material.color = {r: 0, g: 255, b: 255};
                    const sprite = new THREE.Sprite(material);
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

            Graph.onEngineStop(function () {

            });
            if($scope.searchValueMode){
                setTimeout(function () {
                    let searchNode = gData.nodes[$scope.searchNodeValue];
                    searchNode.__threeObj.material.color = {r: 0, g: 255, b: 0};
                    zoomNode(searchNode);
                }, 500);
            }
            // Spread nodes a little wider
            Graph.d3Force('charge').strength(-120);
            if($scope.verticalMode === true) {
                Graph.dagMode('bu')
            .dagLevelDistance(200)
                    .nodeRelSize(NODE_REL_SIZE)
                    .d3Force('collision', d3.forceCollide(node => Math.cbrt(node.size) * NODE_REL_SIZE))
                    .d3VelocityDecay(0.3);
            }
            if($scope.horizontalMode === true) {
                Graph.dagMode('lr')
                    .dagLevelDistance(200)
                    .nodeRelSize(NODE_REL_SIZE)
                    .d3Force('collision', d3.forceCollide(node => Math.cbrt(node.size) * NODE_REL_SIZE))
                    .d3VelocityDecay(0.3);
            }
            if($scope.zoomtoFit) {
                setTimeout(function () {
                    Graph.zoomToFit(1000);
                }, 500);
            }

            function updateHighlight() {
                // trigger update of highlighted objects in scene
                Graph
                    .nodeColor(Graph.nodeColor())
                    .linkWidth(Graph.linkWidth())
                    .linkDirectionalParticles(Graph.linkDirectionalParticles());
            }

            function zoomNode(node) {
                const distance = 40;
                const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
                Graph.cameraPosition(
                    {x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio}, // new position
                    node, // lookAt ({ x, y, z })
                    2000  // ms transition duration
                );
            }
        });
    }

    $scope.links = [{text: 'Default', icon: 'direct', value: 'default', status: 'active'}, {text: 'Links Information', icon: 'link_info', status: 'inactive'}, {text: 'Relation', icon: 'relation', value: 'show_relation', status: 'inactive'}, {text: 'Vertical Hierarchy', icon: 'vertical_hierarchy', value: 'vertical_hierarchy'}, {text: 'Horizontal Hierarchy', icon: 'horizontal_hierarchy', value: 'horizontal_hierarchy'}, {text: 'Unhide Entity', icon: 'unhide_entity', status: 'inactive'}, {text: 'Hide Entity', icon: 'hide_entity', status: 'inactive'}, {text: 'Show Abstract', value: 'abstract', icon: 'show_abstract', status: 'inactive'}, {text: 'Display Photo', icon: 'display_photo', status: 'inactive'}, {text: 'Print', icon: 'print', status: 'inactive'}, {text: 'Save', icon: 'save', status: 'inactive'}];

    $scope.abstractList = [{title: 'System ID', value: '3524488', type: 'sysID'}, {title: 'Status', value: 'Identified'}, {title: 'Name', value: 'Robert William'}, {title: 'Age', value: '35'}, {title: 'Gender', value: 'Male'}, {title: 'Date Of Birth', value: '11/10/1987'}, {title: 'UDB ID', value: '1246854455'}, {title: 'Restriction Status', value: 'Allowed'}];

    $scope.tableData = [{text1: 'Link1', text2: 'Link1', text3: 'Link1', text4: 'Link1', text5: 'Link1', text6: 'Link1'}, {text1: 'Link1', text2: 'Link1', text3: 'Link1', text4: 'Link1', text5: 'Link1', text6: 'Link1'}, {text1: 'Link1', text2: 'Link1', text3: 'Link1', text4: 'Link1', text5: 'Link1', text6: 'Link1'}, {text1: 'Link1', text2: 'Link1', text3: 'Link1', text4: 'Link1', text5: 'Link1', text6: 'Link1'}];

    $scope.filters = [{text: 'All', type:'all'}, {text: 'Human', type: 'human'}, {text: 'Documents', type: 'doc'}, {text: 'Vehicle', type: 'vehicle'}, {text: 'Organization', type: 'org'}];


    function undoNode(nodes){
        nodes.forEach(deselectItem);
        function deselectItem(item) {
            item.__threeObj.material.color = {r: 0, g: 255, b: 255};
        }
    }

    $scope.nodeClick = function (link, links) {
        if(link.value === 'abstract'){
            if($scope.nodeSelected) {
                $('.td-abstract').fadeIn();
                $('.abstract-cont').show();
                $('.abstract-selected-nodes').hide();
                link.status = 'active';
            }
        }
        if(link.value === 'vertical_hierarchy'){
            $scope.verticalMode = true;
            $scope.horizontalMode = false;
            $scope.isRelationActivated = false;
            $scope.zoomtoFit = true;
            drawGraph(workingData);
            link.status = 'active';
            links[4].status = '';
            $('.td-abstract').fadeOut();
            $scope.links[7].status = 'inactive';
            $scope.links[0].status = '';
        }
        if(link.value === 'horizontal_hierarchy'){
            $scope.verticalMode = false;
            $scope.horizontalMode = true;
            $scope.isRelationActivated = false;
            $scope.zoomtoFit = true;
            drawGraph(workingData);
            link.status = 'active';
            links[3].status = '';
            $('.td-abstract').fadeOut();
            $scope.links[7].status = 'inactive';
            $scope.links[0].status = '';
        }
        if(link.value === 'show_relation'){
            if($scope.multiSelect) {
            $scope.isRelationActivated = true;
            drawGraph(workingData);
            links[2].status = 'inactive';
            $scope.multiSelectValue = 'off';
            $scope.multiSelect = false;

            }
        }
        if(link.value === 'default'){
            $scope.verticalMode = false;
            $scope.horizontalMode = false;
            $scope.isRelationActivated = false;
            $scope.zoomtoFit = false;
            drawGraph(lessdata);
            workingData = lessdata;
            link.status = 'active';
            $scope.links[3].status = '';
            $scope.links[4].status = '';
            $scope.filterActivated = false;
            $scope.filterName = 'All';
        }
    };

    function linkClick() {
        $('.td-link-area').slideDown();
        $('.td-link-area').show();
    }

    $scope.abstractClose = function () {
        $('.td-abstract').fadeOut();
        $scope.nodeList = [];
        $scope.links[7].status = '';
    };

    $scope.linkClose = function () {
        $('.td-link-area').slideUp();
    };

    function nodeIconClick() {
        $scope.links[7].status = 'active';
        $scope.nodeList = [];
        $scope.$apply();
        $('.abstract-cont').hide(function () {
            $scope.imgItem = './assets/img/Image.jpg';
            $('.td-abstract').fadeIn();
            $('.abstract-cont').show();
            $('.abstract-selected-nodes').hide();
        });
        $scope.nodeSelected = true;
    }

    function nodeUnselectClick() {
        $('.td-abstract').fadeOut();
        $scope.nodeSelected = false;
        $scope.links[7].status = 'inactive';
    }

    function multiNodeIconClick(id) {
        $('.td-abstract').fadeIn();
        $('.abstract-cont').hide();
        $scope.nodeList.push(id);
        $scope.selectedNodes.push(id);
        if($scope.nodeList.length > 1) {
            $scope.links[2].status = '';
        }
        else {
            $scope.links[2].status = 'inactive';
        }
        $scope.$apply();
        $('.abstract-selected-nodes').show();

    }

    function multiNodeDeselectClick(id) {
        $scope.nodeList.forEach(popNode);
        function popNode(item) {
            if(id === item){
                $scope.nodeList.splice($scope.nodeList.indexOf(id), 1);
                $scope.$apply();
                if($scope.nodeList.length === 0){
                    $('.td-abstract').fadeOut();
                }
            }
        }
    }

    $scope.sideMenuClick = function () {
        $scope.viewSideMenu = !$scope.viewSideMenu;
    };
    $scope.multiSelectClick = function () {
        if($scope.multiSelectValue === 'off'){
            $scope.multiSelectValue = 'on';
            $scope.multiSelect = true;
            $scope.links[7].status = 'inactive';
            setTimeout(function () {
                $scope.selectedNodes = [];
            }, 1000);
        }
        else {
            $scope.multiSelectValue = 'off';
            $scope.multiSelect = false;
            $scope.refreshGraph = true;
            $scope.links[7].status = '';
        }
        $('.td-abstract').fadeOut();
        $scope.nodeList = [];
        drawGraph(workingData);
    };

    $scope.selectFilter = function() {
        $scope.filterCont = !$scope.filterCont;
        $scope.isRelationActivated = false;
    };

    $scope.getAll = function() {
            drawGraph(lessdata);
            workingData = lessdata;
        $scope.filterName = 'All';
        $scope.filterActivated = false;
        $scope.links[0].status = 'active';
        };
    $scope.getHuman = function() {
            drawGraph(humanData);
            workingData = humanData;
        $scope.filterName = 'Human';
        $scope.filterActivated = true;
        $scope.links[0].status = '';
        };
    $scope.getDocs = function() {
            drawGraph(docData);
            workingData = docData;
        $scope.filterName = 'Documents';
        $scope.filterActivated = true;
        $scope.links[0].status = '';
        };
    $scope.getOrg = function() {
            drawGraph(orgData);
            workingData = orgData;
        $scope.filterName = 'Organization';
        $scope.filterActivated = true;
        $scope.links[0].status = '';
        };
    $scope.getVehicle = function() {
            drawGraph(vehicleData);
            workingData = vehicleData;
        $scope.filterName = 'Vehicle';
        $scope.filterActivated = true;
        $scope.links[0].status = '';
        };
    $scope.getMoreData = function() {
        drawGraph(data);
        workingData = data;
        $scope.filterName = '5000+';
        $scope.filterActivated = true;
        $scope.links[0].status = '';
    };

    $scope.DoWork = function(){
        $scope.zoomtoFit = false;
        $scope.searchValueMode = true;
        $scope.searchNodeValue = $scope.searchValue;
        $scope.links[7].status = '';
        $scope.nodeList = [];
        $('.td-abstract').fadeOut();
        $scope.nodeSelected = true;
        drawGraph(workingData);
        setTimeout(function () {
            $scope.searchValueMode = false;
        }, 1000);
    };

    angular.element(document).on('click', onElementClick);

    function onElementClick() {
        // $scope.filterCont = false;
    }

    $scope.multiSelectValue = 'off';
    $scope.multiSelect = false;
    $scope.abstractCont = true;
    $scope.zoomtoFit = false;
    $scope.nodeList = [];
    $scope.refreshGraph = false;
    $scope.viewSideMenu = true;
    $scope.nodeSelected = false;
    $scope.verticalMode = false;
    $scope.horizontalMode = false;
    $scope.searchValueMode = false;
    $scope.searchNodeValue = 0;
    $scope.isRelationActivated = false;
    $scope.selectedNodes = [];
    $scope.filterName = 'All';
});

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});


