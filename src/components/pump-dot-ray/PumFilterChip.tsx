import { Chip } from "@mui/material";
import { IFilterTypes } from "../../common/types";
import { formatNumber } from "../../utils/format";
import { Close } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../libs/redux/hooks";
import { setSearchParams } from "../../libs/redux/slices/pump-socket-slice";

export default function PumFilterChip({ type, name, max, min }: IFilterTypes) {
  const theme = useAppSelector(state => state?.theme.current.styles)
  const dispatch = useAppDispatch()
  const filters = useAppSelector(state => state.pumpSocket.searchParams.filter_listing)

  const handleDelete = (name: IFilterTypes['name']) => {
    dispatch(setSearchParams(filters.filter(item => item.name !== name)))
  }

  return (
    <Chip
      label={`${name} (${name == 'holder_count' ? '' : '$'}${formatNumber(Number(min))}-${name == 'holder_count' ? '' : '$'}${formatNumber(Number(max))}${type == 'percentage' ? '%' : ''})`}
      variant="outlined"
      // onClick={handleClick}
      onDelete={() => handleDelete(name)}
      deleteIcon={<Close style={{ color: theme.text_color }} />}
      style={{ borderRadius: 3, color: theme.text_color, fontSize: 12 }}
    />
  )
}
