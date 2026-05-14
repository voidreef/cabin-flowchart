const recipes = {
  nodes: [
    { id: "assortedPebbles", type: "input", x: 70, y: 70, title: "Assorted Pebbles", subtitle: "Collected tiny stones" },
    { id: "craftCaveStone", type: "process", x: 360, y: 70, title: "Crafting", subtitle: "Pebbles → cave stone" },
    {
      id: "caveStones",
      type: "random",
      x: 650,
      y: 35,
      w: 360,
      h: 150,
      title: "Assorted Cave Stone",
      items: ["Granite", "Andesite", "Diorite", "Tuff", "Dripstone", "Calcite", "Blackstone", "etc."]
    },
    { id: "hammer", type: "process", x: 1070, y: 70, title: "Hammer" },
    { id: "gravel", type: "output", x: 1360, y: 70, title: "Gravel" },

    { id: "gravelSieve", type: "process", x: 360, y: 300, title: "Sieve", subtitle: "Gravel" },
    {
      id: "gravelDrops",
      type: "random",
      x: 650,
      y: 250,
      w: 390,
      h: 245,
      title: "Random Gravel Drops",
      items: [
        "Pebbles", "Flint", "Iron Ore Chunk", "Copper Ore Chunk", "Tin Chunk",
        "Nickel Chunk", "Silver Chunk", "Lead Chunk", "Gold Chunk", "Zinc Chunk",
        "Diamond", "Amethyst Shard", "Lapis Lazuli", "Emerald"
      ]
    },

    { id: "dust", type: "input", x: 70, y: 610, title: "Dust" },
    { id: "water", type: "input", x: 70, y: 740, title: "Water" },
    { id: "clayBarrel", type: "process", x: 360, y: 675, title: "Barrel", subtitle: "Water + dust" },
    { id: "clayBlock", type: "output", x: 650, y: 675, title: "Clay Block" },
    { id: "clay", type: "output", x: 940, y: 675, title: "Clay" },
    { id: "kelp", type: "input", x: 940, y: 805, title: "Kelp" },
    { id: "craftAlgalBlend", type: "process", x: 1230, y: 740, title: "Crafting", subtitle: "Clay + kelp" },
    { id: "algalBlend", type: "output", x: 1520, y: 740, title: "Algal Blend" },
    { id: "furnace", type: "process", x: 1810, y: 740, title: "Furnace" },
    { id: "algalBrick", type: "output", x: 2100, y: 740, title: "Algal Brick" },
    { id: "andesite", type: "input", x: 2100, y: 870, title: "Andesite" },
    { id: "craftAndesiteAlloy", type: "process", x: 2390, y: 805, title: "Crafting", subtitle: "Brick + andesite" },
    { id: "andesiteAlloy", type: "output", x: 2680, y: 805, title: "Andesite Alloy" },

    { id: "sand", type: "input", x: 70, y: 1030, title: "Sand" },
    { id: "sandSieve", type: "process", x: 360, y: 1030, title: "Flint Sieve", subtitle: "Sand" },
    {
      id: "sandDrops",
      type: "random",
      x: 650,
      y: 990,
      w: 350,
      h: 165,
      title: "Random Sand Drops",
      items: ["Flint", "Iron Nugget", "Gold Nugget", "Dead Bush", "Pottery Sherd", "Certus Quartz"]
    },
    { id: "dirt", type: "input", x: 70, y: 1260, title: "Dirt" },
    { id: "dirtSieve", type: "process", x: 360, y: 1260, title: "Sieve", subtitle: "Dirt" },
    {
      id: "dirtDrops",
      type: "random",
      x: 650,
      y: 1235,
      w: 350,
      h: 150,
      title: "Random Dirt Drops",
      items: ["Pebbles", "Flint", "Random Seeds", "Bamboo", "Cherry Petal", "etc."]
    },
    { id: "organic", type: "input", x: 70, y: 1485, title: "Organic Material", subtitle: "Leaves, saplings, etc." },
    { id: "compostBarrel", type: "process", x: 360, y: 1445, title: "Barrel", subtitle: "Compost" },
    { id: "dirtOut", type: "output", x: 650, y: 1445, title: "Dirt" },
    { id: "crucible", type: "process", x: 360, y: 1585, title: "Crucible" },
    { id: "waterOut", type: "output", x: 650, y: 1585, title: "Water" }
  ],
  edges: [
    { from: "assortedPebbles", to: "craftCaveStone" },
    { from: "craftCaveStone", to: "caveStones", label: "craft" },
    { from: "caveStones", to: "hammer" },
    { from: "hammer", to: "gravel" },
    { from: "gravel", to: "gravelSieve" },
    { from: "gravelSieve", to: "gravelDrops", label: "random" },

    { from: "dust", to: "clayBarrel" },
    { from: "water", to: "clayBarrel" },
    { from: "clayBarrel", to: "clayBlock" },
    { from: "clayBlock", to: "clay" },
    { from: "clay", to: "craftAlgalBlend" },
    { from: "kelp", to: "craftAlgalBlend" },
    { from: "craftAlgalBlend", to: "algalBlend" },
    { from: "algalBlend", to: "furnace" },
    { from: "furnace", to: "algalBrick" },
    { from: "algalBrick", to: "craftAndesiteAlloy" },
    { from: "andesite", to: "craftAndesiteAlloy" },
    { from: "craftAndesiteAlloy", to: "andesiteAlloy" },

    { from: "sand", to: "sandSieve" },
    { from: "sandSieve", to: "sandDrops", label: "random" },
    { from: "dirt", to: "dirtSieve" },
    { from: "dirtSieve", to: "dirtDrops", label: "random" },
    { from: "organic", to: "compostBarrel" },
    { from: "compostBarrel", to: "dirtOut" },
    { from: "organic", to: "crucible" },
    { from: "crucible", to: "waterOut" }
  ]
};

const svg = document.querySelector("#chart");
const viewport = document.querySelector("#viewport");
const nodesLayer = document.querySelector("#nodes");
const edgesLayer = document.querySelector("#edges");
const fitButton = document.querySelector("#fitButton");
const resetButton = document.querySelector("#resetButton");

const nodeDefaults = { w: 210, h: 86, rx: 18 };
let transform = { x: 30, y: 30, scale: 1 };
let drag = null;

function nodeById(id) {
  return recipes.nodes.find(node => node.id === id);
}

function nodeSize(node) {
  return { w: node.w ?? nodeDefaults.w, h: node.h ?? nodeDefaults.h };
}

function setTransform(next = transform) {
  transform = next;
  viewport.setAttribute("transform", `translate(${transform.x} ${transform.y}) scale(${transform.scale})`);
}

function wrapItems(items, perLine = 2) {
  const rows = [];
  for (let i = 0; i < items.length; i += perLine) rows.push(items.slice(i, i + perLine).join(" • "));
  return rows;
}

function drawNodes() {
  nodesLayer.replaceChildren();

  for (const node of recipes.nodes) {
    const { w, h } = nodeSize(node);
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.classList.add("node", node.type);
    group.setAttribute("transform", `translate(${node.x} ${node.y})`);

    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("width", w);
    rect.setAttribute("height", h);
    rect.setAttribute("rx", nodeDefaults.rx);
    group.append(rect);

    const title = document.createElementNS("http://www.w3.org/2000/svg", "text");
    title.classList.add("node-title");
    title.setAttribute("x", 20);
    title.setAttribute("y", 32);
    title.textContent = node.title;
    group.append(title);

    if (node.subtitle) {
      const subtitle = document.createElementNS("http://www.w3.org/2000/svg", "text");
      subtitle.classList.add("node-subtitle");
      subtitle.setAttribute("x", 20);
      subtitle.setAttribute("y", 56);
      subtitle.textContent = node.subtitle;
      group.append(subtitle);
    }

    if (node.items) {
      wrapItems(node.items).forEach((row, index) => {
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.classList.add("node-list");
        text.setAttribute("x", 20);
        text.setAttribute("y", 62 + index * 22);
        text.textContent = row;
        group.append(text);
      });
    }

    nodesLayer.append(group);
  }
}

function drawEdges() {
  edgesLayer.replaceChildren();

  for (const edge of recipes.edges) {
    const from = nodeById(edge.from);
    const to = nodeById(edge.to);
    const fromSize = nodeSize(from);
    const toSize = nodeSize(to);
    const x1 = from.x + fromSize.w;
    const y1 = from.y + fromSize.h / 2;
    const x2 = to.x;
    const y2 = to.y + toSize.h / 2;
    const midX = (x1 + x2) / 2;

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.classList.add("edge");
    path.setAttribute("d", `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2 - 10} ${y2}`);
    edgesLayer.append(path);

    if (edge.label) {
      const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
      label.classList.add("edge-label");
      label.setAttribute("x", midX - 22);
      label.setAttribute("y", (y1 + y2) / 2 - 8);
      label.textContent = edge.label;
      edgesLayer.append(label);
    }
  }
}

function chartBounds() {
  const padding = 80;
  const maxX = Math.max(...recipes.nodes.map(node => node.x + nodeSize(node).w)) + padding;
  const maxY = Math.max(...recipes.nodes.map(node => node.y + nodeSize(node).h)) + padding;
  return { width: maxX, height: maxY };
}

function fitView() {
  const bounds = chartBounds();
  const box = svg.getBoundingClientRect();
  const scale = Math.min(box.width / bounds.width, box.height / bounds.height, 1.15);
  setTransform({ x: 35, y: 35, scale });
}

function resetView() {
  setTransform({ x: 30, y: 30, scale: 1 });
}

svg.addEventListener("pointerdown", event => {
  svg.setPointerCapture(event.pointerId);
  svg.classList.add("dragging");
  drag = { startX: event.clientX, startY: event.clientY, originX: transform.x, originY: transform.y };
});

svg.addEventListener("pointermove", event => {
  if (!drag) return;
  setTransform({ ...transform, x: drag.originX + event.clientX - drag.startX, y: drag.originY + event.clientY - drag.startY });
});

svg.addEventListener("pointerup", () => {
  drag = null;
  svg.classList.remove("dragging");
});

svg.addEventListener("wheel", event => {
  event.preventDefault();
  const rect = svg.getBoundingClientRect();
  const cursorX = event.clientX - rect.left;
  const cursorY = event.clientY - rect.top;
  const zoom = event.deltaY < 0 ? 1.08 : 0.92;
  const nextScale = Math.min(2.2, Math.max(0.35, transform.scale * zoom));
  const worldX = (cursorX - transform.x) / transform.scale;
  const worldY = (cursorY - transform.y) / transform.scale;

  setTransform({
    scale: nextScale,
    x: cursorX - worldX * nextScale,
    y: cursorY - worldY * nextScale
  });
}, { passive: false });

fitButton.addEventListener("click", fitView);
resetButton.addEventListener("click", resetView);
window.addEventListener("resize", fitView);

drawEdges();
drawNodes();
fitView();
