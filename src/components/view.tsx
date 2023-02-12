import { useDispatch, useSelector } from 'react-redux';

import Alert from 'antd/es/alert';
import Card from 'antd/es/card';
import Input from 'antd/es/input';
import List from 'antd/es/list';
import Paragraph from 'antd/es/typography/Paragraph';
import Skeleton from 'antd/es/skeleton';
import { Col, Row } from 'antd/es/grid';
import Text from 'antd/es/typography/Text';

import { LocationSearchStateType, StoreType } from '@/store/types';

import { fetchLocationAutoComplete } from '@/store/epics';
import { showLoading, stopSearchMode } from '@/store/reducer';

import { styContent, styFullWidth } from './styles';

const { Search } = Input;
const { Item: ListItem } = List;

const ComponentView = () => {
  const dispatch = useDispatch();
  const { errorMessage, isSearching, loading, predictions, searchHistory } =
    useSelector<StoreType, LocationSearchStateType>(
      (state) => state['location-search'],
    );

  const handleSearch = (query: string) => {
    if (!query) dispatch(stopSearchMode());
    else {
      dispatch(showLoading());
      dispatch(fetchLocationAutoComplete(query));
    }
  };

  return (
    <div className={styContent}>
      <Row gutter={[0, 24]} justify='center'>
        <Col span={18}>
          <Text>
            This search is using mock data, so it's expected that most of the
            search result is empty. Search anything containing
          </Text>
          &nbsp;<Text strong>paris</Text>&nbsp;
          <Text>to show data. Also try searching anything containing</Text>
          &nbsp;
          <Text strong>error</Text>&nbsp;<Text>to show error example.</Text>
        </Col>
        <Col span={18}>
          <Card>
            <Search
              placeholder='Places, city, district,...'
              allowClear
              enterButton
              onSearch={handleSearch}
            />
          </Card>
        </Col>
        {errorMessage ? (
          <Col span={18}>
            <Alert message={errorMessage} type='error' />
          </Col>
        ) : null}
        <Col span={18}>
          {loading ? (
            <Card>
              <Skeleton active />
            </Card>
          ) : null}
          {!isSearching && searchHistory.length ? (
            <Card>
              <List
                bordered
                header='Search History'
                dataSource={searchHistory}
                renderItem={({ date, query }) => (
                  <ListItem>
                    <Row className={styFullWidth} justify='space-between'>
                      <Col span='auto'>
                        <Text strong>{query}</Text>
                      </Col>
                      <Col span='auto'>
                        <Text>{date}</Text>
                      </Col>
                    </Row>
                  </ListItem>
                )}
              />
            </Card>
          ) : null}
          {isSearching && !loading ? (
            <Card>
              <List
                bordered
                header={
                  <span>
                    <Text>Search result for</Text>&nbsp;
                    <Text strong>
                      {searchHistory?.[searchHistory?.length - 1]?.query}
                    </Text>
                    <Text>:&nbsp;{predictions.length} data found.</Text>
                  </span>
                }
                renderItem={(item) => (
                  <ListItem>
                    <Text>{item}</Text>
                  </ListItem>
                )}
                dataSource={predictions}
              />
            </Card>
          ) : null}
        </Col>
      </Row>
    </div>
  );
};

export default ComponentView;
