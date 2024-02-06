export enum CRUD_CONFIG {
    CREATE = 'create',
    READ = 'read',
    UPDATE = 'edit',
    DELETE = 'delete',
}
export enum CATEGORY {
    ONE = '公寓',
    SECAND = '電梯大樓',
    THREE = '透天',
    FOUR = '別墅',
    FIVE = '全部'
}

export enum TAGTIME {
    ONE = '最短租期一年，可隨時遷入',
    SECAND = '最短租期一年，可隨時遷入',
    THREE = '最短租期三年，等房東通知才可遷入',
    FOUR = '最短租期三年，等房東通知才可遷入'
}

export enum TAGRULE {
    ONE = '不可養寵物',
    SECAND = '不可養大型寵物',
    THREE = '可養寵物',
    FOUR = '可養寵物'
}

export enum TAGEQUIMENT {
    ONE = '冰箱,冷氣機,桌椅,床',
    SECAND = '冰箱,冷氣機,電視,桌椅,床',
    THREE = '冰箱,冷氣機,電視,洗衣機,洗碗機,桌椅,床',
    FOUR = '冰箱,冷氣機,電視,洗衣機,洗碗機,桌椅,床,陽台',
}
export enum TAGIMG {
    ONE = '/src/assets/apartment.svg',
    SECAND = '/src/assets/building.svg',
    THREE = '/src/assets/house.svg',
    FOUR = '/src/assets/villa.svg',
}
export enum NOTTAGIMG {
    ONE = '/src/assets/apartment-b.svg',
    SECAND = '/src/assets/building-b.svg',
    THREE = '/src/assets/house-b.svg',
    FOUR = '/src/assets/villa-b.svg',
}