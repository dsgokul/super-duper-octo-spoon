// components/SkillsDistribution.tsx
import React, { useState, useMemo } from "react";
import { PieChart } from '@mui/x-charts/PieChart';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText
} from "@mui/material";
import { useTrainerStore } from "../../store/useTrainerStore";

// Define colors (reused from your original palette)
const COLORS = [
  "#4ECDC4", // teal
  "#FF6B6B", // red
  "#A3C4F3", // blue
  "#F06292", // pink
  "#FFB74D", // orange
  "#81C784", // green
  "#BA68C8", // purple
  "#4FC3F7", // light blue
  "#FFF176", // yellow
  "#A1887F", // brown
];

interface SkillData {
  name: string;
  value: number;
  color: string;
  id: string;
}

const SkillsDistribution = () => {
  // Manage active tab state: "skill" | "tool" | "technology"
  const [activeTab, setActiveTab] = useState<"skill" | "tool" | "technology">("skill");
  // Selected items state (up to 5)
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Get trainers from the existing store
  const trainers = useTrainerStore((state) => state.trainers);

  // Calculate the distribution data based on the active tab
  const allDistributionData = useMemo<SkillData[]>(() => {
    const counts: { [key: string]: number } = {};
    trainers.forEach((trainer) => {
      const key = trainer[activeTab];
      counts[key] = (counts[key] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, value], index) => ({
        name,
        value,
        color: COLORS[index % COLORS.length],
        id: name, // Required for MUI PieChart
      }))
      .sort((a, b) => b.value - a.value);
  }, [trainers, activeTab]);

  // If no selections, show top 5 items; otherwise, filter based on the selections
  const distributionData = useMemo<SkillData[]>(() => {
    if (selectedItems.length > 0) {
      return allDistributionData.filter((item) =>
        selectedItems.includes(item.name)
      );
    }
    return allDistributionData.slice(0, 5);
  }, [allDistributionData, selectedItems]);

  // Handle tab changes and reset selection when tab changes
  const handleTabChange = (event: React.SyntheticEvent, newValue: "skill" | "tool" | "technology") => {
    setActiveTab(newValue);
    setSelectedItems([]);
    console.log(event)
  };

  // Handle selection of items from the dropdown
  const handleSelectChange = (event: any) => {
    const value = event.target.value as string[];
    // Enforce a maximum of 5 selections
    if (value.length <= 5) {
      setSelectedItems(value);
    }
  };

  // Total count (for the center text)
  const totalTrainers = distributionData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom>
        Trainer Distribution Across Skills, Tools & Technologies
      </Typography>
      
      {/* Tab Navigation */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="Skill" value="skill" />
        <Tab label="Tool" value="tool" />
        <Tab label="Technology" value="technology" />
      </Tabs>

      {/* Selection Dropdown with Checkboxes */}
      <Box sx={{ my: 2 }}>
        <FormControl fullWidth size="small">
          <InputLabel id="select-label">
            Select {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} ({selectedItems.length}/5)
          </InputLabel>
          <Select
            labelId="select-label"
            multiple
            value={selectedItems}
            onChange={handleSelectChange}
            label={`Select ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} (${selectedItems.length}/5)`}
            renderValue={(selected) => (selected as string[]).join(", ")}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 300,
                  width: 250
                }
              }
            }}
          >
            {allDistributionData.map((item) => (
              <MenuItem key={item.name} value={item.name}>
                <Checkbox checked={selectedItems.includes(item.name)} size="small" />
                <ListItemText 
                  primary={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                  
                      <Typography variant="body2">{item.name}</Typography>
                    </Box>
                  } 
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* MUI PieChart with Center Label */}
      <Box sx={{ position: "relative", height: 300, width: "100%" }}>
        <PieChart
          series={[
            {
              data: distributionData.map(item => ({
                id: item.id,
                value: item.value,
                label: item.name,
                color: item.color,
              })),
              innerRadius: 60,
              outerRadius: 120,
              paddingAngle: 2,
              cornerRadius: 4,
              startAngle: -45,
              endAngle: 270,
              cx: 150,
              cy: 150,
              valueFormatter: (value) => `${value.value} Trainers`,
            }
          ]}
          width={500}
          height={300}
          legend={{
            direction: 'column',
            position: { vertical: 'middle', horizontal: 'right' },
          }}
          tooltip={{ trigger: 'item' }}
          margin={{ top: 0, bottom: 0, left: 0, right: 120 }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "155px",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
        >
          <Typography variant="h5" align="center">
            {totalTrainers}
          </Typography>
          <Typography variant="subtitle2" align="center">
            Trainers
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default SkillsDistribution;