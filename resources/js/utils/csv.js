export function exportToCSV(
    rows,
    filename = "export.csv",
    customHeaders = null,
) {
    if (!rows || !rows.length) return;

    const headers = customHeaders ?? Object.keys(rows[0]);

    const csv = [
        headers.join(","),

        ...rows.map((row) =>
            Object.keys(row)
                .map((key) => {
                    let value = row[key] ?? "";

                    if (typeof value === "object" && value !== null) {
                        if (value.name !== undefined) {
                            value = value.name;
                        } else if (value.value !== undefined) {
                            value = value.value;
                        } else if (Array.isArray(value)) {
                            value = value.join(", ");
                        } else {
                            value = JSON.stringify(value);
                        }
                    }

                    if (typeof value === "number") {
                        if (value.toString().length >= 10) {
                            value = `="${value}"`;
                        }
                    }

                    if (typeof value === "string" && /^\d{10,}$/.test(value)) {
                        value = `="${value}"`;
                    }

                    value = value.toString().replace(/"/g, '""');

                    return `"${value}"`;
                })
                .join(","),
        ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function prepareCSVData(data, columns) {
    const headers = Object.values(columns);
    const keys = Object.keys(columns);

    const cleaned = data.map((item) => {
        const row = {};
        keys.forEach((key) => {
            if (key.includes(".")) {
                row[key] = getNestedValue(item, key) ?? "";
            } else {
                row[key] = item[key] ?? "";
            }
        });
        return row;
    });

    return { headers, cleaned };
}

function getNestedValue(obj, path) {
    return path.split(".").reduce((current, key) => {
        return current && current[key] !== undefined ? current[key] : null;
    }, obj);
}
