# Load the dplyr library for data manipulation.
library(dplyr)

# Load the dataset from a CSV file, with strings read as categorical factors.
healthcare_data <- read.csv("~/documents/HealthCareData_2024.csv", stringsAsFactors = TRUE)

# Separate the dataset into two subsets based on the classification attribute.
normal_data <- healthcare_data %>% filter(Classification == "Normal")
malicious_data <- healthcare_data %>% filter(Classification == "Malicious")

# Set a random seed to ensure reproducible sampling.
set.seed(10589697)

# Randomly select 400 samples from each classification category.
sample_normal <- normal_data[sample(1:nrow(normal_data), size = 400, replace = FALSE),]
sample_malicious <- malicious_data[sample(1:nrow(malicious_data), size = 400, replace = FALSE),]

# Combine the sampled data into a single dataset.
mydata <- rbind(sample_normal, sample_malicious)

# Display the dimensions and structure of the merged dataset.
dim(mydata)
str(mydata)

# Part 1 - Categorical Data Summarization (i)
# Load the tidyr package for data tidying operations.
library(tidyr)

# Identify which columns in the dataset are categorical.
categorical_cols <- sapply(mydata, is.factor)

# Function to summarize a categorical column with counts and percentages.
summarize_by_category <- function(dataset, col_name) {
  col_summary <- dataset %>%
    group_by(!!sym(col_name)) %>%
    summarize(Count = n(), .groups = 'drop') %>%
    mutate(NonMissingCount = sum(Count[!is.na(!!sym(col_name))]),
           Percentage = paste0(round((Count / NonMissingCount) * 100, 1), "%")) %>%
    select(Category = !!sym(col_name), Count, Percentage)
  
  col_summary <- col_summary %>%
    complete(Category = factor(levels(col_summary$Category)), fill = list(Count = 0, Percentage = "0 (0.0%)")) %>%
    mutate(Feature = col_name) %>%
    arrange(Category) %>%
    select(Feature, everything())
  
  return(col_summary)
}

# Apply the summarization function to each categorical column and combine the results.
category_summaries <- lapply(names(mydata)[categorical_cols], function(col) {
  summarize_by_category(mydata, col)
})

# Combine the summaries for all categorical columns into a single table.
categorical_summary_table <- bind_rows(category_summaries)

# Display the combined categorical data summary table.
print(categorical_summary_table)


# Part 1 - Numeric Data Summarization (ii)
# Identify which columns in the dataset are numeric.
numeric_cols <- sapply(mydata, is.numeric)

# Function to calculate skewness for a numeric vector.
compute_skewness <- function(values) {
  count <- length(values)
  avg <- mean(values, na.rm = TRUE)
  stdev <- sd(values, na.rm = TRUE)
  skewness_value <- (count / ((count - 1) * (count - 2))) * sum(((values - avg) / stdev)^3, na.rm = TRUE)
  return(skewness_value)
}

# Function to summarize numeric columns including missing data statistics and skewness.
summarize_numeric_columns <- function(dataset, col_name) {
  data_count <- nrow(dataset)
  missing_count <- sum(is.na(dataset[[col_name]]))
  missing_percentage <- round((missing_count / data_count) * 100, 1)
  
  # Compute basic summary statistics and skewness for the numeric column.
  numeric_summary <- dataset %>%
    summarise(
      Min = min(.data[[col_name]], na.rm = TRUE),
      Max = max(.data[[col_name]], na.rm = TRUE),
      Mean = mean(.data[[col_name]], na.rm = TRUE),
      Median = median(.data[[col_name]], na.rm = TRUE),
      Skewness = compute_skewness(.data[[col_name]])
    )
  
  # Create a summary table with missing data statistics.
  summary_table <- cbind(
    Feature = col_name,
    Missing = paste(missing_count, "(", missing_percentage, "%)"),
    numeric_summary
  )
  
  # Format numeric summary values for readability.
  summary_table[] <- lapply(summary_table, function(x) if(is.numeric(x)) round(x, 1) else x)
  
  return(summary_table)
}


print(summary_table)

#Part 2
# i
library(dplyr)

dat <- dat %>%
  mutate(
    AlertCategory = replace(AlertCategory, AlertCategory %in% c("Info"), NA),
    NetworkEventType = replace(NetworkEventType, NetworkEventType %in% c("PolicyViolation"), NA)
  )


replace_outliers_with_na <- function(x) {
  Q1 <- quantile(x, 0.25, na.rm = TRUE)
  Q3 <- quantile(x, 0.75, na.rm = TRUE)
  IQR <- Q3 - Q1
  x <- replace(x, x < (Q1 - 1.5 * IQR) | x > (Q3 + 1.5 * IQR), NA)
  return(x)
}

numeric_columns <- c("DataTransferVolume_IN", "DataTransferVolume_OUT", "TransactionsPerSession",
                     "NetworkAccessFrequency", "UserActivityLevel", "SystemAccessRate",
                     "SecurityRiskLevel", "ResponseTime")
for (column in numeric_columns) {
  dat[[column]] <- replace_outliers_with_na(dat[[column]])
}

# ii
write.csv(dat, "~/documents/mydata.csv", row.names = FALSE)

# iii
numeric_data <- mydata %>%
  select(where(is.numeric), Classification)
complete_numeric_data <- numeric_data %>%
  filter(complete.cases(.))
pca_results <- prcomp(complete_numeric_data[,-ncol(complete_numeric_data)], scale. = TRUE) 
explained_variance <- pca_results$sdev^2 / sum(pca_results$sdev^2)
cumulative_variance <- cumsum(explained_variance)

# Display individual and cumulative variance explained by the first three components
explained_variance[1:3]
cumulative_variance[1:3]
# Find the number of components that explain at least 50% of the variance.
num_components <- which(cumulative_variance >= 0.5)[1]
num_components
# Extract loadings for the first three principal components.
loadings <- pca_results$rotation[, 1:3]

# Format the loadings to three decimal places.
formatted_loadings <- round(loadings, 3)

# Print the loadings
formatted_loadings

library(dplyr)
library(ggplot2)

numeric_data <- select(mydata, where(is.numeric))
complete_cases <- complete.cases(numeric_data) 
numeric_data_complete <- numeric_data[complete_cases, ]


pca_result <- prcomp(numeric_data_complete, scale. = TRUE)

classification <- mydata$Classification[complete_cases]

pca_scores <- data.frame(PC1 = pca_result$x[, 1], PC2 = pca_result$x[, 2])
pca_df <- cbind(pca_scores, Classification = classification)


ggplot(pca_df, aes(x = PC1, y = PC2, color = Classification)) +
  geom_point() +
  scale_color_manual(values = c("Normal" = "green", "Malicious" = "red")) + # Adjust as necessary
  labs(title = "PCA Biplot", x = "PC1", y = "PC2") +
  theme_minimal()

# Perform PCA
pca_result <- prcomp(numeric_data_complete, scale. = TRUE)

# Get the importance of components which includes standard deviation, proportion of variance, and cumulative proportion
importance_of_components <- summary(pca_result)$importance

# Print the importance of components
print(importance_of_components)

# Extract the loadings (coefficients) for the first three principal components
loadings <- pca_result$rotation[, 1:3]

# Display the loadings, you can round them for better readability if needed
print(loadings)

# If you want to round the loadings to a certain number of decimal places, e.g., 6
rounded_loadings <- round(loadings, 6)
print(rounded_loadings)

variances <- pca_result$sdev^2
prop_variances <- variances / sum(variances)

# Create the Scree plot
plot(prop_variances, xlab = "Principal Component", ylab = "Proportion of Variance",
     type = "b", pch = 19, main = "Scree plot - Malware")

# For the cumulative proportion on secondary axis
cum_prop_variances <- cumsum(prop_variances)
par(new = TRUE)

# Creating a new plot over the old one without axes and annotations
plot(cum_prop_variances, xlab = "", ylab = "", axes = FALSE, type = "b", pch = 19, 
     col = "blue", lty = 2, main = "")

library(dplyr)

# Example data frame and columns (replace with your actual data frame and column names)
my_data <- data.frame(column1 = sample(c("Yes", "No"), 100, replace = TRUE),
                             Verified_as_Malware = sample(c("Yes", "No"), 100, replace = TRUE))

# Create a contingency table of counts
tab <- table(my_data$column1, my_data$Verified_as_Malware)

# Calculate row percentages
percentages <- prop.table(tab, 1) * 100

# Combine the counts and percentages
combined <- paste0(formatC(tab), " (", formatC(round(percentages, 1)), "%)")

# Create a matrix with the combined data
combined_matrix <- matrix(combined, nrow = nrow(tab), byrow = TRUE, dimnames = dimnames(tab))

# Print the cross-tabulation
combined_matrix