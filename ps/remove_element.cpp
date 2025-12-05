class Solution
{
public:
  int removeElement(vector<int> &nums, int val)
  {
    // [2,3,2,3] => [3,2,2,3] => [3,2,2,3] => [3,2,3,2]
    // [3,2,3,2] => [3,3,2,2] => [3,3,2,2]
    int i = 0, j = 0, tmp = 0, k = 0, c = 0, sz = nums.size();
    for (; i < sz, i++)
      if (nums[i] == val)
        c++;
    k = sz - c;
    for (i = 0; i < k; i++)
    {
      if (nums[i] == val)
      {
        for (j = i; j < sz; j++)
        {
          tmp = nums[j];
          nums[j] = nums[j + 1];
          nums[j + 1] = tmp;
        }
      }
    }
  }
};