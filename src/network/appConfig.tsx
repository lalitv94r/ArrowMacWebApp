const getBaseURL = () => {
    console.log("getBaseURL", process.env.NEXT_PUBLIC_ARROWMAC_API_HOST);
    return `${process.env.NEXT_PUBLIC_ARROWMAC_API_HOST}`;
}

export {
    getBaseURL
}