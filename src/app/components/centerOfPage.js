import { Card, CardContent } from "@mui/material";

function CenterOfPage({ children }) {
    return <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Card>
            <CardContent sx={{ flexDirection: "column", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {children}
            </CardContent>
        </Card>
    </div>;
}

export default CenterOfPage;
