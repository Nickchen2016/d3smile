const svg = d3.select('svg');

const width = svg.attr('width');
const height = svg.attr('height');

const g = svg.append('g')
        .attr('transform', `translate(${width/2},${height/2})`)

const circle = g.append('circle')
        .attr('r',200)
        .attr('fill', 'yellow')
        .attr('stroke','black')
const leftEye = g.append('circle')
        .attr('r',20)
        .attr('cx', -80)
        .attr('cy', -60)
        .attr('fill', 'black')
const rightEye = g.append('circle')
        .attr('r',20)
        .attr('cx', +80)
        .attr('cy', -60)
        .attr('fill', 'black')

const mouth = g.append('path')
        .attr('d', d3.arc()({
            innerRadius: 120,
            outerRadius: 140,
            startAngle: Math.PI/2,
            endAngle: Math.PI*1.5
        }))