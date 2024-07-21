import { Component, Input, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-json-tree',
  template: '<div id="tree-container"></div>',
  styleUrls: ['./json-tree.component.css']
})
export class JsonTreeComponent implements OnChanges {
  @Input() jsonData: any;

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['jsonData']) {
      this.createRadialTree(transformToHierarchy(changes['jsonData'].currentValue));
    }
  }

  createRadialTree(data: any): void {
    if (!data) {
      return;
    }

    const width = this.el.nativeElement.offsetWidth;
    const height = this.el.nativeElement.offsetHeight;
    const radius = Math.min(width, height) / 2;

    const treeLayout = d3.tree()
      .size([2 * Math.PI, radius - 100])
      .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);

    const root = d3.hierarchy(data);
    treeLayout(root);

    const nodes = root.descendants();
    const links = root.links();

    d3.select('#tree-container').selectAll('*').remove();

    const svg = d3.select('#tree-container')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const linkGenerator = d3.linkRadial<any, d3.HierarchyPointLink<any>>()
      .angle((d: any) => d.x)
      .radius((d: any) => d.y);

    svg.selectAll('.link')
      .data(links)
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', linkGenerator)
      .attr('stroke', '#ccc');

    const node = svg.selectAll('.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d: any) => `
        rotate(${d.x * 180 / Math.PI - 90}) 
        translate(${d.y},0)
      `);

    node.append('circle')
      .attr('r', 10)
      .attr('fill', '#69b3a2');

    node.append('text')
      .attr('dy', '0.31em')
      .attr('x', (d: any) => d.x < Math.PI === !d.children ? 6 : -6)
      .attr('text-anchor', (d: any) => d.x < Math.PI === !d.children ? 'start' : 'end')
      .attr('transform', (d: any) => d.x >= Math.PI ? 'rotate(180)' : null)
      .text((d: any) => d.data.name);
  }
}

// Helper function to transform JSON into D3 hierarchy-compatible structure
function transformToHierarchy(data: any, name = 'root'): any {
  if (typeof data !== 'object' || data === null) {
    return { name, value: data };
  }

  const children = Object.keys(data).map(key => transformToHierarchy(data[key], key));
  return { name, children };
}
