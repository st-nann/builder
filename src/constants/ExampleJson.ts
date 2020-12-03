export const SIMPLE_JSON = {
    element: 'container',
    'container-props': {
        background: '',
        flexbox: {
            'flex-grow': 1,
            'flex-direction': 'column'
        }
    },
    children: [
        {
            element: 'container',
            'container-props': {
                flexbox: {
                    'flex-grow': 1,
                    'flex-direction': 'row'
                }
            },
            children: [
                {
                    element: 'text',
                    'container-props': {
                        background: '',
                        'border-bottom': {
                            width: '1px',
                            style: 'solid',
                            color: '#0000000'
                        },
                        flexbox: {
                            'flex-grow': 1
                        }
                    },
                    'element-props': {
                        link: 'http://*',
                        font: {
                            family: '',
                            size: '*px',
                            weight: 100,
                            color: '#0000000'
                        },
                        'text-align': 'left',
                        'line-height': 1.5,
                    }
                }
            ]
        }
    ]
}


export const ADVANCE_JSON = {
    element: 'container',
    props: {
        background: '',
        flexbox: {
            'flex-grow': 1,
            'flex-direction': 'column'
        }
    },
    children: [
        {
            element: 'container',
            props: {
                flexbox: {
                    'flex-grow': 1,
                    'flex-direction': 'row'
                }
            },
            children: [
                {
                    element: 'text',
                    props: {
                        background: '',
                        'border-bottom': {
                            width: '1px',
                            style: 'solid',
                            color: '#0000000'
                        },
                        flexbox: {
                            'flex-grow': 1
                        },
                        link: 'http://*',
                        font: {
                            family: '',
                            size: '*px',
                            weight: 100,
                            color: '#0000000'
                        },
                        'text-align': 'left',
                        'line-height': 1.5,
                    }
                }
            ]
        },
        {
            element: 'container',
            props: {
                flexbox: {
                    'flex-grow': 1,
                    'flex-direction': 'row'
                }
            },
            children: [
                {
                    element: 'spacer',
                    props: {
                        background: '',
                        'border-bottom': {
                            width: '1px',
                            style: 'solid',
                            color: '#0000000'
                        },
                        flexbox: {
                            'flex-grow': 1,
                        },
                        height: '90px'
                    }
                }
            ]
        },
        {
            element: 'container',
            props: {
                flexbox: {
                    'flex-grow': 1,
                    'flex-direction': 'row'
                }
            },
            children: [
                {
                    element: 'box',
                    props: {
                        background: '',
                        'border-bottom': {
                            width: '1px',
                            style: 'solid',
                            color: '#0000000'
                        },
                        flexbox: {
                            'flex-grow': 1,
                            'flex-direction': 'row'
                        },
                        padding: '30px'
                    },
                    children: [
                        {
                            element: 'image',
                            props: {
                                background: '',
                                'border-bottom': {
                                    width: '1px',
                                    style: 'solid',
                                    color: '#0000000'
                                },
                                flexbox: {
                                    'flex-grow': 1,
                                },
                                width: '250px',
                                link: 'http://*',
                                compress: true
                            }
                        }
                    ]
                },
                {
                    element: 'box',
                    props: {
                        background: '',
                        'border-bottom': {
                            width: '1px',
                            style: 'solid',
                            color: '#0000000'
                        },
                        flexbox: {
                            'flex-grow': 1,
                            'flex-direction': 'row'
                        },
                        padding: '20px'
                    },
                    children: [
                        {
                            element: 'box',
                            props: {
                                background: '',
                                'border-bottom': {
                                    width: '1px',
                                    style: 'solid',
                                    color: '#0000000'
                                },
                                flexbox: {
                                    'flex-grow': 1,
                                    'flex-direction': 'row'
                                },
                                padding: '20px'
                            },
                            children: [
                                {
                                    element: 'text',
                                    props: {
                                        background: '',
                                        'border-bottom': {
                                            width: '1px',
                                            style: 'solid',
                                            color: '#0000000'
                                        },
                                        flexbox: {
                                            'flex-grow': 1,
                                        },
                                        link: 'http://*',
                                        font: {
                                            family: '',
                                            size: '14px',
                                            weight: 100,
                                            color: ''
                                        },
                                        'text-align': 'left',
                                        'line-height': 1.5,
                                    }
                                }
                            ]
                        },
                        {
                            element: 'box',
                            props: {
                                background: '',
                                'border-bottom': {
                                    width: '1px',
                                    style: 'solid',
                                    color: '#0000000'
                                },
                                flexbox: {
                                    'flex-grow': 1,
                                    'flex-direction': 'row'
                                },
                                padding: '20px'
                            },
                            children: [
                                {
                                    element: 'text',
                                    props: {
                                        background: '',
                                        'border-bottom': {
                                            width: '1px',
                                            style: 'solid',
                                            color: '#0000000'
                                        },
                                        flexbox: {
                                            'flex-grow': 1,
                                        },
                                        link: 'http://*',
                                        font: {
                                            family: '',
                                            size: '14px',
                                            weight: 100,
                                            color: ''
                                        },
                                        'text-align': 'left',
                                        'line-height': 1.5,
                                    }
                                }
                            ]
                        }  
                    ]
                },
                {
                    element: 'box',
                    props: {
                        background: '',
                        'border-bottom': {
                            width: '1px',
                            style: 'solid',
                            color: '#0000000'
                        },
                        flexbox: {
                            'flex-grow': 1,
                            'flex-direction': 'row'
                        },
                        padding: '20px'
                    },
                    children: [
                        {
                            element: 'box',
                            props: {
                                background: '',
                                'border-bottom': {
                                    width: '1px',
                                    style: 'solid',
                                    color: '#0000000'
                                },
                                flexbox: {
                                    'flex-grow': 1,
                                    'flex-direction': 'row'
                                },
                                padding: '20px'
                            },
                            children: [
                                {
                                    element: 'text',
                                    props: {
                                        background: '',
                                        'border-bottom': {
                                            width: '1px',
                                            style: 'solid',
                                            color: '#0000000'
                                        },
                                        flexbox: {
                                            'flex-grow': 1,
                                        },
                                        link: 'http://*',
                                        font: {
                                            family: '',
                                            size: '14px',
                                            weight: 100,
                                            color: ''
                                        },
                                        'text-align': 'left',
                                        'line-height': 1.5
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            element: 'container',
            props: {
                flexbox: {
                    'flex-grow': 1,
                    'flex-direction': 'row'
                }
            },
            children: [
                {
                    element: 'button',
                    props: {
                        background: '',
                        'border-bottom': {
                            width: '1px',
                            style: 'solid',
                            color: '#0000000'
                        },
                        flexbox: {
                            'flex-grow': 1
                        },
                        link: 'http://*',
                        font: {
                            family: '',
                            size: '14px',
                            weight: 100,
                            color: '',
                        },
                        border: {
                            width: '1px',
                            style: 'solid',
                            color: '#0000000',
                            radius: '8px'
                        }
                    }
                }
            ]
        }
    ]
}
