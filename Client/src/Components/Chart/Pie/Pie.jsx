
import { PieChart, Pie, Cell,Tooltip,Legend, ResponsiveContainer} from "recharts";



const COLORS = ["#36A2EB", "#FFCE56", "#4CAF50","pink","red"];

const PieComponent = ({apidata}) => {

  console.log(apidata);
  



  let data= apidata||[];

  return (<>
    <ResponsiveContainer width="100%" height={350}>
    <PieChart >
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={150}
        fill="hsl(243, 52%, 68%)"
        dataKey="number"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart></ResponsiveContainer></>
  );
};

export default PieComponent;

