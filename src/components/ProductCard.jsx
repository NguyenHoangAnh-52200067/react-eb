import { Card, Image, Typography } from "antd";
import { useNavigate } from "react-router-dom";
const { Meta } = Card;
const ProductCard = ({ product }) => {
  const styles = {
    image: {
      aspectRatio: "1/1",
      objectFit: "cover",
      width: "100%",
      borderRadius: "8px",
      maxHeight: "380px",
    },
    price: {
      fontSize: "1.35rem",
      fontWeight: "bold",
    },
  };
  const naviageToProduct = useNavigate();
  return (
    <Card
      bordered={true}
      hoverable
      cover={<Image style={styles.image} src={product.images[0].url} />}
    >
      <div
        onClick={() => {
          naviageToProduct(`/product/${product.id}`);
        }}
        style={{ marginBlock: "10px" }}
      >
        <Meta
          title={product.name}
          description={`${product.brand ?? ""} - ${product.color ?? ""}`}
        />
      </div>
      <Typography.Text type="danger" style={styles.price}>
        ${product.price}
      </Typography.Text>
    </Card>
  );
};

export default ProductCard;
