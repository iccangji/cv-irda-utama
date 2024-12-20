function priceFormat(price) {
    const formatter = new Intl.NumberFormat('id-ID'); // Menggunakan format Indonesia
    return formatter.format(price);
}

export default priceFormat;