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
    FOUR = '別墅'
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
    ONE = 'https://storage.googleapis.com/vue-course-api.appspot.com/jordanttcdesign/1629385120434.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=c%2BJjXYSstri27f1pLSo%2F7FIdCUatiOT64v9CwBWVyU5QlZao84N9H7BqaSSndTcZQGfiOuqXF9oCQPQhEsGzYCium4PqHPN%2BMU4mAluTcDrpmutUsnwHtg4b%2ByyhltEQsNHmoLAQqjP84IJ%2FNi66BuqmjJ%2BPm8kpng%2B8U60gXQRcW6RVxNqXi4m%2FJBsbAO5wQRaIx1Ndb%2Bh2C2IPAgcwmsPftOqR8%2BKCKAHBwmzQbUXRKe4gmX1kinU1VoqSW0hj1Ae2NRPz1j2PllGf%2B3YZ4dgG62QlSGLSXcU%2BMJSeMfOJSP7M2UxMAdoHHT6Ux6FEK5MfdOEr2G%2F8vrilTG39wg%3D%3D',
    SECAND = 'https://storage.googleapis.com/vue-course-api.appspot.com/jordanttcdesign/1629385120434.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=c%2BJjXYSstri27f1pLSo%2F7FIdCUatiOT64v9CwBWVyU5QlZao84N9H7BqaSSndTcZQGfiOuqXF9oCQPQhEsGzYCium4PqHPN%2BMU4mAluTcDrpmutUsnwHtg4b%2ByyhltEQsNHmoLAQqjP84IJ%2FNi66BuqmjJ%2BPm8kpng%2B8U60gXQRcW6RVxNqXi4m%2FJBsbAO5wQRaIx1Ndb%2Bh2C2IPAgcwmsPftOqR8%2BKCKAHBwmzQbUXRKe4gmX1kinU1VoqSW0hj1Ae2NRPz1j2PllGf%2B3YZ4dgG62QlSGLSXcU%2BMJSeMfOJSP7M2UxMAdoHHT6Ux6FEK5MfdOEr2G%2F8vrilTG39wg%3D%3D',
    THREE = 'https://storage.googleapis.com/vue-course-api.appspot.com/jordanttcdesign/1629385120434.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=c%2BJjXYSstri27f1pLSo%2F7FIdCUatiOT64v9CwBWVyU5QlZao84N9H7BqaSSndTcZQGfiOuqXF9oCQPQhEsGzYCium4PqHPN%2BMU4mAluTcDrpmutUsnwHtg4b%2ByyhltEQsNHmoLAQqjP84IJ%2FNi66BuqmjJ%2BPm8kpng%2B8U60gXQRcW6RVxNqXi4m%2FJBsbAO5wQRaIx1Ndb%2Bh2C2IPAgcwmsPftOqR8%2BKCKAHBwmzQbUXRKe4gmX1kinU1VoqSW0hj1Ae2NRPz1j2PllGf%2B3YZ4dgG62QlSGLSXcU%2BMJSeMfOJSP7M2UxMAdoHHT6Ux6FEK5MfdOEr2G%2F8vrilTG39wg%3D%3D',
    FOUR = 'https://storage.googleapis.com/vue-course-api.appspot.com/jordanttcdesign/1629385120434.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=c%2BJjXYSstri27f1pLSo%2F7FIdCUatiOT64v9CwBWVyU5QlZao84N9H7BqaSSndTcZQGfiOuqXF9oCQPQhEsGzYCium4PqHPN%2BMU4mAluTcDrpmutUsnwHtg4b%2ByyhltEQsNHmoLAQqjP84IJ%2FNi66BuqmjJ%2BPm8kpng%2B8U60gXQRcW6RVxNqXi4m%2FJBsbAO5wQRaIx1Ndb%2Bh2C2IPAgcwmsPftOqR8%2BKCKAHBwmzQbUXRKe4gmX1kinU1VoqSW0hj1Ae2NRPz1j2PllGf%2B3YZ4dgG62QlSGLSXcU%2BMJSeMfOJSP7M2UxMAdoHHT6Ux6FEK5MfdOEr2G%2F8vrilTG39wg%3D%3D',
}