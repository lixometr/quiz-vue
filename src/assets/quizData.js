const initDataRequest = {
    data: {$_GET}        
}

const initDataResponse = {
    h1: '2-комнатные квартиры  в новостройках  Краснодара, район Черемушки',
    h2: 'ЖК Дыхание', // optional
    h3: 'Стоимость до 2 000 000 ₽',  // optional
    h3: 'Срок сдачи до 2 квартал 2021г', // optional
    mainColor: 'red',
    mainColor2: 'white',
    imageBack: 'https://image.jpeg', // image to place under main screen  
    imageBack2: 'https://', // image for red shape  // optional
    button: 'Начать быстрый поиск',
    logo: 'https://image.svg',
    screens: [ // all screens except 5 can be optional
        {
            id: 1,
            type: 'rangeSlider',
            title: 'Укажите максимальную стоимось квартитры',
            limit: 7800000,        
            imageBack: 'image.jpeg',
        },
        {
            id: 2,
            type: 'listBox',
            title: 'Выберите районы',
            imageBack: 'image.jpeg',
            items: [
                'district1',
                'district2',
            ]
        }
        {
            id: 3,
            type: 'listBox',
            title: 'Сколько комнат Вам нужно?',
            imageBack: 'image.jpeg',
            items: [
                'Студии',
                ' 2 - комнатные квартиры',
            ]
        },
        {
            id: 4,
            type: 'listBox',
            title: 'Когда жилой комплекс должен быть сдан?',
            imageBack: 'image.jpeg'
            items: [
                'ЖК сдается в 2021 году',
                'ЖК сдается в 2022 году',
            ]
        },        
        {
            id: 5,
            imageBack: 'image.jpeg',
            type: 'process',
            title: 'Подбираются варианты',
        }

    ]
 }
 
 
const answersRequest = {
    screens: [
        {
            id: 1,
            value: 7800000
        },
        {
            id: 2,
            value: 2
        },
        {
            id: 3,
            value: 2
        },
        {
            id: 4,
            value: 2
        }
    ];
}

 
const answersResponse = {
    h1: 'Подобрано 135 вариантов по вашим параметрам',
    h2: 'Есть варианты со скидками и спецпредложениями', // optional
    hint: 'Для получения доступа к базе укажите свой номер телефона', // optional
    icon: 'htpps//', // optional
    button: 'Посмотреть подборку',
    imageBack: 'image.jpeg',
    imageBottom: 'image.jpeg',
}


const finalRequest = {
    phone: '+79111232323';
}
 
 
const finalResponse = {
    h1: 'По Вашим параметрам  подходят квартиры в 28 жилых комплексах:',
    imageBack: 'image.jpeg',
    buildings: [
        {
            image: 'https://image.jpg',
            title: 'ЖК Квадрат',
            href: 'https',
        },
        {
            image: 'https://image.jpg',
            title: 'ЖК Квадрат',
            href: 'https',
        }
    ]
}
