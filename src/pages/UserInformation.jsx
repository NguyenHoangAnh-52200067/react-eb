import { Descriptions, Image, Space, Typography } from "antd";
import { useMediaQuery } from "react-responsive";
import ChangeUserInfo from "../components/ChangeUserInfo";
import ChangePassword from "../components/ChangePassword";
import useSWR from "swr";
import useAxiosFetcher from "../configuration/useAxiosFetcher";
import ChangeAvatar from "../components/ChangeAvatar";

const UserInformation = () => {
  const styles = {
    section: {
      paddingInline: "45px",
    },
    container: {
      maxWidth: "1200px",
      marginInline: "auto",
    },
    imageContainer: {
      display: "flex",

      alignItems: "center",
      gap: "15px",
    },
    image: {
      width: "180px",
      borderRadius: "8px",
      objectFit: "cover",
      aspectRatio: "1/1",
    },
  };
  const isMobile = useMediaQuery({ query: "(max-width: 580px)" });

  const fetcher = useAxiosFetcher(true);

  const { data: info, isLoading, error, mutate } = useSWR("auth/info", fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <Typography.Title
          level={2}
          style={{
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          Your Information
        </Typography.Title>
        <div style={styles.imageContainer}>
          <Image style={styles.image} src={info.avatar || "/user.png"} />
          <Space direction={isMobile ? "vertical" : "horizontal"}>
            <ChangeAvatar mutate={mutate} />
            <ChangeUserInfo info={info} mutate={mutate} />
          </Space>
        </div>
        <Descriptions
          style={{
            marginBlock: "30px",
          }}
          bordered
          title="User Info"
          items={[
            {
              key: "1",
              label: "Email",
              children: info.email,
            },
            {
              key: "2",
              label: "Full Name",
              children: info.fullName ?? "empty",
            },
            {
              key: "3",
              label: "Phone Number",
              children: info.phoneNumber ?? "empty",
            },
            {
              key: "4",
              label: "Address",
              children: info.address ?? "empty",
            },
            {
              key: "5",
              label: "Gender",
              children: info.gender.toUpperCase() ?? "empty",
            },
          ]}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          <ChangePassword />
        </div>
      </div>
    </section>
  );
};

export default UserInformation;
