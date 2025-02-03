const ImgText = ({ text, img }) => {
    return (
        <div className="img-text-container">
            <img src={img} alt="Imagen relacionada" />
            <p>{text}</p>
        </div>
    );
};

export default ImgText;