import { Card } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import PageWrapper from "../components/common/PageWrapper";
import PageHeader from "../components/common/PageHeader";
import SearchBar from "../components/common/SearchBar";
import UserTable from "../components/admin/UserTable";

const UserManagement = () => {
  const [search, setSearch] = useState("");
  const { t } = useTranslation();

  return (
    <PageWrapper>
      <PageHeader title={t("manage_users")} />

      <Card>
        <SearchBar
          placeholder={t("search_user_placeholder")}
          onSearch={(value) => setSearch(value)}
        />
        <div className="mt-4">
          <UserTable searchTerm={search} />
        </div>
      </Card>
    </PageWrapper>
  );
};

export default UserManagement;
