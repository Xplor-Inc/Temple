import { Accordion, Card } from "react-bootstrap";
import Chart from "react-google-charts";
import { GoogleChartWrapperChartType } from "react-google-charts/dist/types";
import { ContextAwareToggle } from "../Page/ContextAwareToggle";
import { LoaderInner } from "../Page/Loader";

interface IProp {
    data?: any[];
    hTitle: string,
    vTitle: string,
    title: string,
    type: GoogleChartWrapperChartType
}

export const GoogleChart = ({ data, hTitle, vTitle, title, type }: IProp) => {
    var slices = {
        0: { color: 'red' },
        1: { color: 'green' }
    }
    return (
        <div className="box">
            <Accordion defaultActiveKey="0">
                <Card.Header>
                    <ContextAwareToggle eventKey="0">
                        {title}
                    </ContextAwareToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body className="w-100">
                        {
                            data ? data.length > 0 ?
                                <Chart style={{ borderRadius: "1rem" }}
                                    chartEvents={[
                                        {
                                            eventName :"select",
                                            callback: ({ chartWrapper }) => {
                                                const chart = chartWrapper.getChart();
                                                const selection = chart.getSelection();
                                                if (selection.length > 0) {
                                                    const row = selection[0].row;
                                                    const column = selection[0].column;
                                                    const value = data[row][column];
                                                    console.log(`Selected cell: Row ${row}, Column ${column}, Value: ${value}`);
                                                    console.log('selection', selection);
                                                }
                                            }
                                    }
                                    ]}
                                    width={'100%'}
                                    height={300}
                                    chartType={type}
                                    loader={<LoaderInner />}
                                    data={data}
                                    options={{
                                        slices: slices,
                                        is3D: false,
                                        pieHole: 0.5,
                                        chartArea: { width: '80%' },
                                        hAxis: {
                                            title: hTitle,
                                            minValue: 0,
                                        },
                                        vAxis: {
                                            title: vTitle,
                                        },
                                        legend: { position: 'top', alignment:'center' }
                                    }}
                                />
                                :
                                <div className="bg-warning c-warning">Data is not available for selected date range</div>
                                : <LoaderInner />
                        }
                    </Card.Body>
                </Accordion.Collapse>
            </Accordion>
        </div>
    )
}