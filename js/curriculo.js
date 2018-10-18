

Highcharts.setOptions({
    lang:{
        drillUpText: '<'
    }
});

Highcharts.chart('grafico-habilidades', {
    chart: {
        type: 'bar',
        marginLeft: 150,
    },
    title: {
        text: 'Habilidades por nível de domínio'
    },
    xAxis: {
        type: 'category',
        title: {
            text: null
        },
        min: 0,
        scrollbar: {
            enabled: true
        },
        tickLength: 0
    },
    yAxis: {
        min: 0,
        max: 10,
        title: {
            text: 'Domínio',
            align: 'high'
        }
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    color: {
        linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
        stops: [
            [0, '#003399'],
            [1, '#3366AA']
        ]
    },
    legend: {
        enabled: false
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Domínio',
        data: [{
            name: 'Programação',
            y: 9,
            drilldown: 'programacao'
        }, {
            name: 'Banco de dados',
            y: 8,
            drilldown: 'banco'
        }, {
            name: 'Engenharia de software',
            y: 8,
            drilldown: 'engenharia'
        }, {
            name: 'Marketing',
            y: 7,
            drilldown: 'marketing'
        }]
    }],
    drilldown: {
        drillUpButton: {
            relativeTo: 'spacingBox',
            position: {
                y: 0,
                x: 0
            },
            theme: {
                fill: 'url(#arrow)',
                'stroke-width': 1,
                stroke: 'silver',
                r: 0,
                states: {
                    hover: {
                    fill: 'url(#coloured-arrow)',
                    }
                }
                }

        },
        series: [
            {
            name: 'Domínio',
            id: 'programacao',
            data: [
                ['C++', 8],
                ['Java', 9],
                ['Javascript', 9],
                ['Php', 9],
                ['Python', 9],
                ['Ruby', 9]             
            ],
        }, {
            name: 'Domínio',
            id: 'banco',
            data: [
                ['Gerenciamento', 8],
                ['Modelagem', 8]
            ]
        }, {
            name: 'Domínio',
            id: 'engenharia',
            data: [
                ['Metodologias ágeis', 8],
                ['Padrões de projeto', 7],
                ['Propagação de modificações', 9],
                ['Qualidades de software', 8]
            ]
        }, {
            name: 'Domínio',
            id: 'marketing',
            data: [
                ['Análise de tráfego', 8],
                ['Email marketing', 8], 
                ['Gestão de leads', 7],
                ['SEO', 7]
            ]
        }]
    }
});

Highcharts.chart('grafico-ferramentas', {
    chart: {
        type: 'bar',
        marginLeft: 150
    },
    title: {
        text: 'Ferramentas por nível de domínio'
    },
    xAxis: {
        type: 'category',
        title: {
            text: null
        },
        min: 0,
        scrollbar: {
            enabled: true
        },
        tickLength: 0
    },
    yAxis: {
        min: 0,
        max: 10,
        title: {
            text: 'Domínio',
            align: 'high'
        }
    },
    plotOptions: {
        column: {
            colorByPoint: true
        }
    },
    colors: [
        '#20c997'
    ],
    legend: {
        enabled: false
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Domínio',
        data: [
            ["Excel", 7],
            ["Facebook API", 7],
            ["Google Analytics", 8],
            ["Google Tag Manager", 9],
            ["Linux", 8],
            ["MySQL", 9],
            ["Windows", 8],
            ["Wordpress", 9],               
        ]
    }]
});

