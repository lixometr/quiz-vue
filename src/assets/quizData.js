// INIT REQUEST
const initDataRequest = {
    data: {$_GET}        
}

const initDataResponse = {
    titles: {
        h1: 'text',
        h2: 'text',
        h3: ['text1', 'text2'],
        tagline: 'Сервис по подбору квартир\r\n- более 50 000 предложений!',
        count: 'Всего <span>22 333</span>квартир в базе'
    },
    colors: {
        buttonText: 'black',
        color: '#DD060C',
        color2: '#FFFFFF',
        questionBack: 'white'
    }
    images: {
        back1:'https://admin.m2.center/media/2021/08/07.jpg',
        back2: 'https://admin.m2.center/media/2021/08/clothMini.png',
        logo: 'https://admin.m2.center/media/2021/08/logo.svg'
    },
    targets: {
        google: ['target', 'action', 'event']
        yandex: {
            metrikaId: 2222,
            target: 'phoneSent'
        }
    },
    question: {
        id: 'rooms'
        imageBack: 'https://admin.m2.center/media/2021/08/04.jpg'
        title: 'Сколько комнат вам нужно?'
        items: [
            {id: "0", value: "Студии"}, 
            {id: "1", value: "1-комнатные квартиры"},…
        ]
        type: 'listBox'
        controls: false, // If enable show "select all" and "clear" buttons
    },
    questionsCount: 6,
    sessionId: '6124911c18de9',
    button: 'Начать быстрый поиск'
}


// POST ANSWER REQUEST
const postAnswerRequest = {
    sessionId: '6129e6d93c1d5',
    questionId: 'rooms',
    answer: [0,1]
}

const postAnswerResponse = {
    id: "price",
    imageBack: "https://admin.m2.center/media/2021/08/03.jpg",
    limit: 35838000,
    minValue: 3638100,
    presets: [2, 3, 5, 10],
    title: "Укажите максимальный бюджет",
    type: "rangeSlider",
    value: 19738050,
    count: 'Отобрано <span>22 333</span>квартир',
    hint: 'html' // optional
}
 
// GET FORM REQUEST
const getFormResponse = {
    imageBottom: 'image.jpeg',
    imageBack: 'image.jpeg',
    forms: [
        {
            h1: 'Подобрано <span>135</span> вариантов по вашим параметрам',
            h2: 'Есть варианты со скидками и спецпредложениями', // optional
            hint: 'Для получения доступа к базе укажите свой номер телефона', // optional
            icon: 'htpps//', // optional
            button: 'Посмотреть подборку',
            type: 'phone',
            filter: {
                title: 'Изменить параметры подбора',
                filters: {
                    [
                        title: 'стоимость',
                        id: 'price',
                        presets:[2,3,5,7],                
                        minValue: 2638100,
                        maxValue: 4638100,
                        defValue: 3638100,
                        type: 'rangeSlider'
                    ],
                    [
                        title: 'комнатность',
                        type: 'buttons'
                        id: 'rooms',
                        type: 'listBox',
                        items: [
                            {id: "0", value: "Студии", selected:false}, 
                            {id: "1", value: "1-комнатные квартиры", selected:true},…
                        ],
                        available: [0,1] // show options with these id only. Other options must be hidden. 
                    ],
                    [
                        title: 'Районы',
                        id: 'districts',
                        controls: true, // If enable show "select all" and "clear" button
                        items: [
                            {id: "0", value: "Юбилейный", selected:false}, 
                            {id: "1", value: "Черемушки", selected:false},…
                        ]
                        available: [0,1] // show options with these id only. Other options must be hidden. 
                    ],
                },
            }
        },
        {
            h1: 'Как как к вам обращаться?',
            h2: '', // optional
            hint: '', // optional
            icon: 'htpps//', // optional
            button: 'Посмотреть подборку',
            type: 'text',
            placeholder: 'Введите ваше имя' // optional
        },
    ]
}

// CHANGE FILTER REQUEST
const filterRequest = {
    sessionId: '61336b0134509',
    filters: [ 
        {
            id:'price',
            values: 5000000
        }, 
        {
            id:'rooms',
            values: [0,2,3,4]
        }, 
        {   id:'districts',
            values: [1,2]
        }
    ] // JSON.stringify
}


const filterResponse = {
    count: 2715,
    districts: [7, 18, 3, 4, 21, 14, 35, 1, 6, 27, 38, 17, 37, 12, 16, 40, 22, 8] // show options with these id only. Other options must be hidden. 
    rooms: [0, 1, 2, 3]                                                           // don't need to keep state of option, if it's hidden just show with unchecked state.
    filters: [ 
        {
            id:'price',
            values: 5000000
        }, 
        {
            id:'rooms',
            values: [0,2,3,4]
        }, 
        {   id:'districts',
            values: [1,2]
        }
    ] // JSON.stringify
}


// COMPLETE RESPONSE
const completeResponse = {
    h1: 'По Вашим параметрам  подходят квартиры в 28 жилых комплексах:',
    imageBack: 'image.jpeg',
    buildings: [
        {
            image: 'https://image.jpg',
            title: 'ЖК Квадрат',
            href: 'https',
            text: '76 квартир'
        },
    ]
}
