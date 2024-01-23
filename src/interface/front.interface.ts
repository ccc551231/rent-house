/**單筆回傳資訊 */
export interface ProductIner{
    category: string;
    content: string;
    description: string;
    id: string;
    imageUrl: string;
    imagesUrl: [];
    is_enabled: number;
    origin_price: number;
    price: number;
    title: string;
    unit: string;
    tagRULE?: string;
    tagEQ?: string;
    tagTIME?: string;
}
