// resources/js/Components/Dashboard/StatCard.jsx
import React from "react";
import { Card, CardContent } from "../UI/Card";

export const StatCard = ({ title, value, icon: Icon, trend, description }) => {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <Icon className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="ml-4 w-0 flex-1">
                        <dl>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                {title}
                            </dt>
                            <dd>
                                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {value}
                                </div>
                            </dd>
                        </dl>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
