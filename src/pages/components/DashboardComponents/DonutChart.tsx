import React, { useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { 
  Box, 
  Typography, 

  ClickAwayListener,
 
  Popper,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
 
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface CityData {
  name: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  title?: string;
  data: CityData[];
}

const DonutChart: React.FC<DonutChartProps> = ({ title = 'City', data }) => {
  // State for active slice
 
  // State for the city selector dropdown
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  // Calculate total for the center of the donut chart
  const totalTrainers = data.reduce((sum, item) => sum + item.value, 0);

  // Handle opening the city selector dropdown
  const handleSelectorClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
    setSelectorOpen(!selectorOpen);
  };

  // Handle closing the city selector dropdown
  const handleSelectorClose = () => {
    setSelectorOpen(false);
  };

  // Handle slice click
/*   const handleItemClick = (event: any, itemIndex: number) => {
    setActiveIndex(activeIndex === itemIndex ? null : itemIndex);
  }; */

  // Prepare data for MUI PieChart
  const chartData = data.map((item) => ({
    id: item.name,
    value: item.value,
    label: item.name,
    color: item.color
  }));

  return (
    <Box>
      {title && (
        <Typography variant="h6" sx={{ mb: 2 }}>
          {title}
        </Typography>
      )}

      {/* City selector */}
      <Box sx={{ position: 'relative', mb: 3 }}>
        <Box
          onClick={handleSelectorClick}
          sx={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            p: 1,
            cursor: 'pointer',
          }}
        >
          <Typography variant="body2" fontWeight="medium">
            Select Cities (Max 5)
          </Typography>
          <KeyboardArrowDownIcon sx={{ ml: 'auto' }} />
        </Box>

        <Popper
          open={selectorOpen}
          anchorEl={anchorEl}
          placement="bottom-start"
          sx={{ zIndex: 1200, width: anchorEl ? anchorEl.clientWidth : 'auto' }}
        >
          <ClickAwayListener onClickAway={handleSelectorClose}>
            <Paper elevation={3} sx={{ mt: 1, width: '100%' }}>
              <List dense sx={{ py: 1 }}>
                {data.map((item) => (
                  <ListItem key={item.name} component="div" sx={{ cursor: 'pointer' }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          bgcolor: item.color,
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </ClickAwayListener>
        </Popper>
      </Box>

      <Box sx={{ height: 250, position: 'relative' }}>
        <PieChart
          series={[
            {
              data: chartData,
              innerRadius: 60,
      
              paddingAngle: 2,
              cornerRadius: 4,
              cx: 150,
              cy: 125,
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: { innerRadius: 60, outerRadius: 80, color: 'gray' },
              
              valueFormatter: (value) => `${value.value} Trainers`,
        
              arcLabelMinAngle: 45,
            }
          ]}
          width={500}
          height={250}
       
      
          tooltip={{ trigger: 'item' }}
          margin={{ top: 0, bottom: 0, left: 0, right: 120 }}
          slotProps={{
            legend: {
              itemMarkWidth: 8,
              itemMarkHeight: 8,
              markGap: 5,
              itemGap: 10
            }
          }}
        />
        
        {/* Center total */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "150px",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            textAlign: "center"
          }}
        >
          <Typography variant="h5">
            {totalTrainers}
          </Typography>
          <Typography variant="subtitle2">
            Trainers
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default DonutChart;