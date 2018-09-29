export default [            
    {
        id: 10,
        type: 'fullwidth',        
        elements: [
            {
                id: 111,
                type: 'texteditor',
                content: `
                <h1 style="color: rgb(124,112,107);">Ехал Грека</h1>
                <h2 style="color: rgb(124,112,107);">Через реку</h2>
                <h3 style="color: rgb(124,112,107);">видит Грека</h3>
                <p style="color: rgb(124,112,107);">В реке рак. <strong>Сунул Грека руку в реку</strong>, рак за руку греку цап</p>`.trim()
            }
        ]
    },
    {
        id: 11,
        type: 'column_2',
        color: '#fdd835',
        elements: [
            {
                id: 222,
                type: 'texteditor',
                content: '<p style="color: rgb(40,50,78);">видит грека</p>'
            },
            {
                id: 333,
                type: 'texteditor',
                content: '<p style="color: rgb(40,50,78);">в реке рак</p>'
            }
        ]
    },
    {
        id: 12,
        type: 'column_3',
        elements: [
            {
                id: 444,
                type: 'texteditor',
                content: '<p style="color: rgb(124,112,107);">рак за руку греку цап</p>'
            },
            {
                id: 555,
                type: 'texteditor',
                content: '<p style="color: rgb(124,112,107);">рак за руку греку цап</p>'
            },
            {
                id: 666,
                type: 'texteditor',
                content: '<p style="color: rgb(124,112,107);">рак за руку греку цап</p>'
            }
        ]
    },
    {
        id: 13,
        type: 'column_2',
        elements: []
    }
]