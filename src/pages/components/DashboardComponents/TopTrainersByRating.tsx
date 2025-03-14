import React, { useState } from "react";
import { useTrainerStore } from "../../../store/useTrainerStore";
import { BarChart } from '@mui/x-charts/BarChart';
import {
  Box,
  Typography,
  Card,
  TextField,
  MenuItem,
  Checkbox,
  Button,
  Menu,
  FormControlLabel
} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const TopTrainersByRating: React.FC = () => {
  const { trainers } = useTrainerStore();

  // Selected ratings for filtering
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  // Control visibility of the rating dropdown
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  // Sort order state
  const [sortOrder, setSortOrder] = useState<"max" | "min">("max");

  // Available ratings 1-5
  const availableRatings = [1, 2, 3, 4, 5];

  // Toggle dropdown
  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  // Add/remove a rating from the selectedRatings array
  const handleRatingCheckboxChange = (rating: number) => {
    if (selectedRatings.includes(rating)) {
      setSelectedRatings(selectedRatings.filter((r) => r !== rating));
    } else {
      setSelectedRatings([...selectedRatings, rating]);
    }
  };

  // Filter trainers based on selected ratings
  const filteredTrainers =
    selectedRatings.length > 0
      ? trainers.filter((t) => selectedRatings.includes(Math.floor(t.ratings)))
      : trainers;

  // Convert filtered trainers into chart data: name + rating
  let chartData = filteredTrainers.map((trainer) => ({
    name: trainer.name,
    rating: trainer.ratings,
  }));

  // Sort by rating
  if (sortOrder === "max") {
    chartData.sort((a, b) => b.rating - a.rating);
  } else {
    chartData.sort((a, b) => a.rating - b.rating);
  }

  // Limit to top 5
  chartData = chartData.slice(0, 5);

  return (
    <Card
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        backgroundColor: "#f8fafc",
        width: "100%"
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
        Top Trainers By Rating
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
        {/* Rating Filter Dropdown Button */}
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
          {selectedRatings.length === 0 
            ? "Filter by Rating" 
            : `Rating: ${selectedRatings.sort((a, b) => a - b).join(", ")}`}
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
              padding: 8
            }
          }}
        >
          {availableRatings.map((rating) => (
            <MenuItem 
              key={rating} 
              dense
              onClick={() => handleRatingCheckboxChange(rating)}
              sx={{ py: 0.5 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedRatings.includes(rating)}
                    size="small"
                    onClick={(e) => e.stopPropagation()}
                    onChange={() => handleRatingCheckboxChange(rating)}
                  />
                }
                label={<Typography variant="body2">{`${rating} Star${rating !== 1 ? 's' : ''}`}</Typography>}
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
              dataKey: 'name',
              tickLabelStyle: {
                fontSize: 14,
                fill: '#64748b',
                fontWeight: 500,
              },
              label: 'Trainers',
              labelStyle: {
                fontSize: 14,
                fontWeight: 500,
                fill: '#64748b',
              }
            },
          ]}
          yAxis={[
            {
              label: 'Rating',
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
              min: 0
            },
          ]}
          series={[
            {
              dataKey: 'rating',
              label: 'Rating',
              valueFormatter: (value: number | null) => value ? `${value.toFixed(1)}` : '0.0',
              color: '#1e88e5',
              highlightScope: {
                highlighted: 'item',
                faded: 'global'
              }
            },
          ]}
          grid={{ 
            vertical: false
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

export default TopTrainersByRating;