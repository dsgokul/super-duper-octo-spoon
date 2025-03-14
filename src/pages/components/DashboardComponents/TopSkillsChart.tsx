import React, { useState } from "react";
import { useTrainerStore } from "../../../store/useTrainerStore";
import { BarChart } from '@mui/x-charts/BarChart';
import {
  Box,
  Typography,
  MenuItem,
  Checkbox,
  Card,
  Button,
  Menu,
  FormControlLabel,
  TextField
} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const TopSkillsChart: React.FC = () => {
  const { trainers } = useTrainerStore();

  // Track multiple selected skills
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  // Control showing/hiding the multi-select dropdown
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  // Track sort order
  const [sortOrder, setSortOrder] = useState<"max" | "min">("max");

  // Get unique skill names from the trainer list
  const uniqueSkills = [...new Set(trainers.map((t) => t.skill))];

  // Toggle dropdown open/closed
  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  // Handle checking/unchecking a skill
  const handleSkillCheckboxChange = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      // Remove skill if already selected
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      // Add skill if not selected
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  // Filter trainers by the selected skills; if none are selected, use all
  const filteredTrainers =
    selectedSkills.length > 0
      ? trainers.filter((t) => selectedSkills.includes(t.skill))
      : trainers;

  // Count how many trainers per skill
  const skillCounts = filteredTrainers.reduce<Record<string, number>>(
    (acc, trainer) => {
      acc[trainer.skill] = (acc[trainer.skill] || 0) + 1;
      return acc;
    },
    {}
  );

  // Convert the skillCounts object into an array for MUI Charts
  let chartData = Object.entries(skillCounts).map(([skill, count]) => ({
    skill,
    count,
  }));

  // Sort data by count
  if (sortOrder === "max") {
    // Descending
    chartData.sort((a, b) => b.count - a.count);
  } else {
    // Ascending
    chartData.sort((a, b) => a.count - b.count);
  }

  // Show only up to 5 bars
  chartData = chartData.slice(0, 5);

  return (
    <Card
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        backgroundColor: "#f8fafc",
      }}
    >
      {/* Title */}
      <Typography 
        variant="h5" 
        sx={{ 
          fontWeight: 700, 
          mb: 2,
          color: "#0f172a"
        }}
      >
        Top Skills Offered By Trainers
      </Typography>

      {/* Filter & Sort Controls */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 3,
        }}
      >
        {/* Multi-Select Skill Filter Button */}
        <Button
          onClick={handleFilterClick}
          endIcon={<KeyboardArrowDownIcon />}
          variant="outlined"
          sx={{
            height: 46,
            width: 260,
            justifyContent: "space-between",
            textTransform: "none",
            borderRadius: 2,
            bgcolor: "#fff",
            color: "#64748b",
            borderColor: "rgba(0, 0, 0, 0.23)",
            textAlign: "left",
            pl: 2,
            "&:hover": {
              bgcolor: "#f8fafc",
              borderColor: "rgba(0, 0, 0, 0.23)"
            }
          }}
        >
          {selectedSkills.length === 0 
            ? "Filter by Skill" 
            : `Skills: ${selectedSkills.length} selected`}
        </Button>

        <Menu
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleFilterClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          sx={{ mt: 1 }}
          PaperProps={{
            style: {
              width: 260,
              padding: 8,
              maxHeight: 300
            }
          }}
        >
          {uniqueSkills.map((skill) => (
            <MenuItem 
              key={skill} 
              dense
              onClick={() => handleSkillCheckboxChange(skill)}
              sx={{ py: 0.5 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedSkills.includes(skill)}
                    size="small"
                    onClick={(e) => e.stopPropagation()}
                    onChange={() => handleSkillCheckboxChange(skill)}
                  />
                }
                label={<Typography variant="body2">{skill}</Typography>}
                sx={{ width: '100%' }}
              />
            </MenuItem>
          ))}
        </Menu>

        {/* Sort Order Dropdown */}
        <TextField
          select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "max" | "min")}
          sx={{
            width: 260,
            bgcolor: "#fff",
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
            "& .MuiInputBase-root": {
              height: 46,
            }
          }}
        >
          <MenuItem value="max">Sort : Maximum</MenuItem>
          <MenuItem value="min">Sort : Minimum</MenuItem>
        </TextField>
      </Box>

      {/* Bar Chart */}
      <Box sx={{ width: "100%", height: 320, mt: 2 }}>
        <BarChart
          dataset={chartData}
          xAxis={[
            {
              scaleType: 'band',
              dataKey: 'skill',
              tickLabelStyle: {
                fontSize: 14,
                fill: '#64748b',
                fontWeight: 500,
              },
              label: '', // Removed the 'Skills' label
              labelStyle: {
                fontSize: 14,
                fontWeight: 500,
                fill: '#64748b',
              }
            },
          ]}
          yAxis={[
            {
              label: 'No. of Trainers',
              labelStyle: {
                fontSize: 14,
                fontWeight: 500,
                fill: '#64748b',
              },
              tickLabelStyle: {
                fontSize: 14,
                fill: '#64748b',
              },
              max: 5,
            },
          ]}
          series={[
            {
              dataKey: 'count',
              label: 'Skill',
              valueFormatter: (value, context) => {
                // Access skill name from the dataKey and dataset
                if (context && context.dataIndex !== undefined && Array.isArray(chartData)) {
                  const dataItem = chartData[context.dataIndex];
                  return dataItem ? `${dataItem.skill}: ${value} trainers` : `${value} trainers`;
                }
                return `${value} trainers`;
              },
              color: '#1e88e5',
              highlightScope: {
                highlighted: 'item',
                faded: 'global'
              }
            },
          ]}
          grid={{ 
            vertical: false,
          }}
          height={320}
          margin={{ top: 20, right: 40, left: 60, bottom: 40 }}
          slotProps={{
            legend: { hidden: true },
          }}
          tooltip={{ trigger: 'item' }}
        />
      </Box>
    </Card>
  );
};

export default TopSkillsChart;